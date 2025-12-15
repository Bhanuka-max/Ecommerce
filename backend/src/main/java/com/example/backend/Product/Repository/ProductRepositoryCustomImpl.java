package com.example.backend.Product.Repository;

import com.example.backend.Product.Model.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Repository
public class ProductRepositoryCustomImpl implements ProductRepositoryCustom {

    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public Page<Product> filterProducts(String name, String category, Double minPrice, Double maxPrice,
            Pageable pageable) {
        Query query = new Query();

        if (name != null && !name.isEmpty()) {
            query.addCriteria(Criteria.where("name").regex(name, "i"));
        }
        if (category != null && !category.isEmpty()) {
            query.addCriteria(Criteria.where("category").regex(category, "i"));
        }

        if (minPrice != null || maxPrice != null) {
            List<Criteria> priceCriteria = new ArrayList<>();
            if (minPrice != null) {
                priceCriteria.add(Criteria.where("price").gte(minPrice));
            }
            if (maxPrice != null) {
                priceCriteria.add(Criteria.where("price").lte(maxPrice));
            }
            query.addCriteria(new Criteria().andOperator(priceCriteria.toArray(new Criteria[0])));
        }

        query.with(pageable); // Apply pagination first

        long total = mongoTemplate.count(query, Product.class); // Get total count based on the query criteria

        List<Product> products = mongoTemplate.find(query, Product.class); // Execute the query with pagination applied
        return new PageImpl<>(products, pageable, total); // Create and return the Page object
    }

    // Get new arrivals
    @Override
    public List<Product> getNewArrivals() {
        Query query = new Query()
                .with(Sort.by(Sort.Direction.DESC, "_id")) // Sort by creation timestamp or `_id`
                .limit(12); // Limit to 12 products
        return mongoTemplate.find(query, Product.class);
    }

    // Get distinct categories
    @Override
    public List<String> findDistinctCategories() {
        return mongoTemplate.query(Product.class)
                .distinct("category")
                .as(String.class)
                .all();
    }

}

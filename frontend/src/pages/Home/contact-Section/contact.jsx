import React, { useState } from "react";
import "./contact.css";
import Button from "../../../components/shared/button/Button";
import { sendEmail } from "../../../api/emailService";
import { useAlert } from "../../../context/GlobalAlertContext";

const Contact = () => {

  const {showAlert} = useAlert();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    sendEmail(formData)
      .then(() => {
        showAlert("Email sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      })
      .catch((error) => {
        console.error("Failed to send email:", error);
        showAlert("Failed to send email. Please try again later.");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="contact_us">
      <h1 className="contact_title">Contact Us</h1>
      <div className="contact_details">
        <div className="contact_item">
          <h3>ADDRESS</h3>
          <p>234 University of Kelaniya, Kelaniya</p>
        </div>
        <div className="contact_item">
          <h3>CONTACT US</h3>
          <p>+94 78 254 3766</p>
        </div>

        <div className="contact_item">
          <h3>EMAIL</h3>
          <p>rosalovershop@gmail.com</p>

        </div>
      </div>

      <div className="form_map_container">
        <form className="contact_form" onSubmit={handleSubmit}>
          <label htmlFor="name">FULL NAME</label>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="form_input"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <label htmlFor="email">EMAIL ADDRESS</label>
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            className="form_input"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label htmlFor="message">MESSAGE</label>
          <textarea
            name="message"
            placeholder="Your Message"
            className="form_input2"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <Button
            className="form-button"
            label={loading ? "Sending..." : "Send Message"}
            disabled={loading}
          />
        </form>

        <div className="map_container">
          <iframe
            title="Google Map"
            className="google_map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7920.893419391628!2d79.92044355!3d6.9565152!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25789f736ff2f%3A0x7b61e230dd11e6ec!2sKelaniya%2C%20Peliyagoda!5e0!3m2!1sen!2slk!4v1733719526431!5m2!1sen!2slk"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;

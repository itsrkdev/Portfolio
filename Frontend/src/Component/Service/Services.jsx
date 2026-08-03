import React, { useEffect, useState } from 'react';
import "./Service.css";
import axios from "axios"
const BASE_URL = import.meta.env.VITE_API_URL

export default function Services() {

    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`${BASE_URL}/api/services`)
            .then(res => {
                setServices(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });

    }, [])

    return (

        <section id="modern-services-section">
            <div className="services-container">
                <header className="services-header">
                    <span className="services-badge">
                        <span className="services-badge-dot"></span>
                        What I Offer
                    </span>
                    <h1 className="section-title">Specialized <span>Services</span></h1>
                    <p>Solutions tailored to your digital needs</p>
                </header>

                <div className="services-list">
                    {loading ? (
                        [1, 2, 3, 4, 5].map((item) => (
                            <div className="service-row skeleton-active" key={item}>
                                <div className="skeleton skeleton-number"></div>
                                <div className="service-row-main">
                                    <div className="skeleton skeleton-title-sm"></div>
                                    <div className="skeleton skeleton-text-line"></div>
                                </div>
                                <div className="skeleton skeleton-img-circle"></div>
                            </div>
                        ))
                    ) : services && services.length > 0 ? (
                        services.map((service, index) => (
                            <div className="service-row" key={service._id}>
                                <span className="row-number">0{index + 1}</span>

                                <div className="service-row-main">
                                    <h3>{service.title}</h3>
                                    <p>{service.description}</p>
                                </div>

                                <div className="service-image-box">
                                    <img
                                        src={
                                            service.image?.startsWith('http')
                                                ? service.image
                                                : `${BASE_URL}/${service.image}`.replace(/([^:]\/)\/+/g, "$1")
                                        }
                                        alt={service.title}
                                        onError={(e) => {
                                            e.target.src = "https://via.placeholder.com/300?text=Service+Icon";
                                        }}
                                    />
                                </div>

                                <div className="row-arrow">
                                    <i className="fa-solid fa-arrow-right"></i>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="services-empty">No services found.</p>
                    )}
                </div>
            </div>
        </section>
    );
}
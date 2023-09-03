import React from "react";
import featuresData from "../../assets/data/features.json";
import "./features.scss";

function Features() {
    return (
        <section className="features">
            <h2 className="sr-only">Features</h2>
            {featuresData.map((feature) => (
                <div className="feature-item" key={feature.id}>
                    <img
                        className="feature-icon"
                        src={require(`../../assets/img/${feature.icon}`)}
                        alt={`${feature.title} Icon`}
                        width="150px"
                    />
                    <h3 className="feature-item-title">{feature.title}</h3>
                    <p>{feature.description}</p>
                </div>
            ))}
        </section>
    );
}

export default Features;

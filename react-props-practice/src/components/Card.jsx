import React from "react";

function Card(p) {
    return (
        <div className="card">
            <div className="top">
                <h2 className="name">{p.name}</h2>
                <img
                    className="circle-img"
                    src={p.image}
                    alt="avatar_img"
                />
            </div>
            <div className="bottom">
                <p className="info">{p.tel}</p>
                <p className="info">{p.email}</p>
            </div>
        </div>
    );
}

export default Card;
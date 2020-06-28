import React from "react";

function Entry(c) {
    return (
        <div className="term">
            <dt>
            <span className="emoji" role="img" aria-label={c.name}>
                {c.emoji}
            </span>
                <span>{c.name}</span>
            </dt>
            <dd>
                {c.meaning}
            </dd>
        </div>
    );
}

export default Entry;
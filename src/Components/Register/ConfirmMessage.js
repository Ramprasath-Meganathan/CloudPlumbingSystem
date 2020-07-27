import React from 'react';

const ConfirmMessage = props=>{
    return(
        <section className="alert alert-primary text-container" role="alert">
            {props.message}
        </section>
    )
}

export default ConfirmMessage

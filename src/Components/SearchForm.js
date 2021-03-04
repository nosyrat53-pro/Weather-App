import React from 'react' ;
import './SearchForm.css';

const Form = (props) => {

    return(

        <div>
            <form onSubmit={props.handleSearch} className="container-form">
                <input type="text" defaultValue="daraa" required autoComplete="off" placeholder="City..." name="city"/>
                <input type="text" defaultValue="syria" required autoComplete="off" placeholder="Country..." name="country"/>
                <button>Search</button>
            </form>
        </div>

    );


}

export default Form ;
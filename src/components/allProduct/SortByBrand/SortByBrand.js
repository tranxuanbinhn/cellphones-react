import React from "react";
import '../SortByBrand/SortByBrand.css';

function SortByBrand(props){
    const brands= props.brand;
    return(
        <div className="brand">
            <ul className="brand-inner">
                <li className="brand-item"><a>Apple</a></li>
                <li className="brand-item"><a>Sam sung</a></li>

                

            </ul>
        </div>
    );
}
export default SortByBrand;
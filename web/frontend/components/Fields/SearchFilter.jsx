import { Card, Filters } from "@shopify/polaris";
import { useState, useCallback } from "react";

function SearchFilter() {
    const [queryValue, setQueryValue] = useState(null);

    const handleFiltersQueryChange = useCallback(
        (value) => setQueryValue(value),
        []
    );
    const handleQueryValueRemove = useCallback(() => setQueryValue(""), []);
    return (
        <div className="mt-3" style={{ height: "50px" }}>

            <Filters
                queryValue={queryValue}
                filters={[]}
                onQueryChange={handleFiltersQueryChange}
                onQueryClear={handleQueryValueRemove}
            />
        </div>
    );
}

export default SearchFilter;
const  Headings = ({text,subtext}) =>{
    return (
        <>
        <p className="mb-2 mt-2 fs-6 fw-semibold">{text}</p>
        {subtext !== ''?<p className="mb-2 text-secondary">{subtext}</p>:''}
        </>
    )
}

export default Headings
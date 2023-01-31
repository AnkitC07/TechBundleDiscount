const  Headings = ({text,subtext}) =>{
    return (
        <>
        <p className="mb-2 mt-2 Polaris-TextStyle--variationStrong">{text}</p>
        {subtext !== ''?<p className="mb-2 text-secondary Polaris-Text--regular">{subtext}</p>:''}
        </>
    )
}

export default Headings
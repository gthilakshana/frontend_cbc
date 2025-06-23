export default function ProductCard(props) {
    console.log(props)
    return (
        <div>
            <img src={props.img} alt="image" />
            <h1>{props.name}</h1>
            <h2>{props.price}</h2>
            <button>Add to Cart</button>
        </div>
    )
}

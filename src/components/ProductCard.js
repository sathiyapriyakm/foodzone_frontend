import React,{useState} from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../features/cartSlice";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [isHovering, setIsHovering] = useState(false);
  const [isHoveringAddCart, setIsHoveringAddCart] = useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };
  const handleMouseEnterAddCart = () => {
    setIsHoveringAddCart(true);
  };

  const handleMouseLeaveAddCart = () => {
    setIsHoveringAddCart(false);
  };

  return (
    <div className="cardwrapper">
      {" "}
      <Card style={{ width: "18rem" }}>
        <Card.Img
          className="foodZoneImg"
          variant="top"
          src={product.image}
          height={80}
          width={50}
          style={{
            transform: isHovering ? "scale(1.1)": '',
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
        <Card.Body>
          <Card.Title>{product.title}</Card.Title>
          <Card.Text>{product.description}</Card.Text>
          <ListGroup className="list-group-flush">
            <ListGroup.Item style={{color:"green",fontWeight:"700"}}>Rs.{product.price}</ListGroup.Item>
          </ListGroup>
          {user && user.user.userType != "admin" ? (
            <Button
              variant="warning"
              onClick={() => {
                dispatch(
                  addToCart({
                    product,
                  })
                );
                toast.success("Item added to cart Successfully");
              }}
              style={{
                backgroundColor: isHoveringAddCart ? 'green' : '',
              }}
              onMouseEnter={handleMouseEnterAddCart}
              onMouseLeave={handleMouseLeaveAddCart}
            >
              Add to Cart
            </Button>
          ) : null}
        </Card.Body>
      </Card>
    </div>
  );
}

export default ProductCard;

import { useEffect, useRef } from "react";
import styled from "styled-components";

const Item = ({ item, totalCost, numOwned, handleClick, firstItem }) => {
  const firstItemRef = useRef(null);

  useEffect(() => {
    if (firstItem) {
      firstItemRef.current.focus();
    }
  }, [firstItem]);

  return (
    <Button ref={firstItemRef} onClick={() => handleClick(item)}>
      <div>
        <Name>{item.name}</Name>
        {item.type === "tick" ? (
          <Information>
            Cost: {totalCost} cookie(s). Produces {item.value} cookies/second.
          </Information>
        ) : (
          <Information>
            Cost: {totalCost} cookie(s). Adds {item.value(numOwned)}{" "}
            cookies/click.
          </Information>
        )}
      </div>
      <Number>{numOwned}</Number>
    </Button>
  );
};

export default Item;

const Button = styled.button`
  background-color: transparent;
  border-top: none;
  border-left: none;
  border-right: none;
  color: white;
  font-weight: bold;
  border-bottom: 1px solid #ffffff99;
  text-align: start;
  display: flex;
  align-items: center;
  margin: 0.5rem;
  padding-bottom: 1rem;
  justify-content: space-between;
`;

const Name = styled.div`
  font-size: 1rem;
`;

const Information = styled.div`
  font-weight: normal;
  color: #ffffff99;
`;

const Number = styled.div`
  font-size: 2rem;
  margin-left: 1rem;
`;

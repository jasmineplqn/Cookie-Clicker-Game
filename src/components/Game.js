import styled from "styled-components";
import { Link } from "react-router-dom";

import cookieSrc from "../cookie.svg";
import Item from "./Item";
import { useState } from "react";
import useInterval from "../hooks/use-interval";
import useKeyup from "../hooks/useKeyup";
import useDocumentTitle from "../hooks/useDocumentTitle";

const items = [
  {
    id: "cursor",
    name: "Cursor",
    cost: 10,
    value: 1,
    type: "tick",
  },
  {
    id: "megaCursor",
    name: "Mega Cursor",
    cost: 100,
    value: (purchased) => 2 ** purchased,
    type: "click",
  },
  {
    id: "grandma",
    name: "Grandma",
    cost: 100,
    value: 10,
    type: "tick",
  },
  {
    id: "farm",
    name: "Farm",
    cost: 1000,
    value: 80,
    type: "tick",
  },
];

const Game = () => {
  const [numCookies, setNumCookies] = useState(0);
  const [purchasedItems, setPurchasedItems] = useState({
    cursor: 0,
    megaCursor: 0,
    grandma: 0,
    farm: 0,
  });

  const calculateCookiesPerTick = (purchasedItems) => {
    let count = 0;
    const itemsTick = items.filter((item) => item.type === "tick");
    itemsTick.forEach((item) => {
      count += item.value * purchasedItems[item.id];
    });
    return count;
  };

  const calculateCookiesPerClick = () => {
    let click = 1;
    const itemsClick = items.filter((item) => item.type === "click");
    itemsClick.forEach((item) => {
      if (purchasedItems[item.id] > 0) {
        click = item.value(purchasedItems[item.id]);
      }
    });
    return click;
  };

  useInterval(() => {
    const numOfGeneratedCookies = calculateCookiesPerTick(purchasedItems);
    setNumCookies(numCookies + numOfGeneratedCookies);
  }, 1000);

  const totalCostPerPurchase = (numberPurchased, item) => {
    let cost = item.cost;
    return Math.floor(cost * 1.25 ** numberPurchased);
  };

  const handleItemClick = (item) => {
    const cost = totalCostPerPurchase(purchasedItems[item.id], item);
    if (numCookies < cost) {
      window.alert("cannot afford");
      return;
    }

    setNumCookies(numCookies - cost);
    const storedPurchasedItems = { ...purchasedItems };
    storedPurchasedItems[item.id] += 1;
    setPurchasedItems(storedPurchasedItems);
  };

  const handleCookieClick = () => {
    setNumCookies((cookie) => cookie + calculateCookiesPerClick());
  };

  useDocumentTitle(
    `${numCookies} cookies - Cookie Clicker Workshop`,
    `Cookie Clicker Workshop`
  );

  useKeyup("Space", () => {
    handleCookieClick();
  });

  return (
    <Wrapper>
      <GameArea>
        <Indicator>
          <Total>{numCookies} cookies</Total>
          {}
          <BoldSpan>{calculateCookiesPerTick(purchasedItems)}</BoldSpan> cookies
          per second
          <div>
            <BoldSpan>{calculateCookiesPerClick()}</BoldSpan> cookies per click
          </div>
        </Indicator>
        <Button onClick={() => handleCookieClick()}>
          <Cookie src={cookieSrc} />
        </Button>
      </GameArea>

      <ItemArea>
        <SectionTitle>Items:</SectionTitle>
        {items.map((item, index) => {
          return (
            <Item
              item={item}
              totalCost={totalCostPerPurchase(purchasedItems[item.id], item)}
              numOwned={purchasedItems[item.id]}
              handleClick={handleItemClick}
              firstItem={index === 0}
              key={item.id}
            />
          );
        })}
      </ItemArea>
      <HomeLink to="/">Return home</HomeLink>
    </Wrapper>
  );
};

const BoldSpan = styled.span`
  font-weight: bold;
`;

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
`;
const GameArea = styled.div`
  flex: 1;
  display: grid;
  place-items: center;
`;
const Button = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
`;

const Cookie = styled.img`
  width: 200px;
`;

const ItemArea = styled.div`
  height: 100%;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SectionTitle = styled.h3`
  text-align: center;
  font-size: 32px;
  color: yellow;
`;

const Indicator = styled.div`
  position: absolute;
  width: 250px;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
`;

const Total = styled.h3`
  font-size: 28px;
  color: lime;
`;

const HomeLink = styled(Link)`
  position: absolute;
  top: 15px;
  left: 15px;
  color: #666;
`;

export default Game;

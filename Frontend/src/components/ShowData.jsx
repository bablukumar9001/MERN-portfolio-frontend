import React from "react";
import { useNavigate } from "react-router-dom";

const showData = () => {
  const navigate = useNavigate();

  const test = (e) => {
    // e.preventDefault();

    console.log("this is working");
    window.alert(" working");
    navigate("/show");
  };

  return (
    <>
      <p>
        {" "}
        this is the main data page Lorem ipsum, dolor sit amet consectetur
        adipisicing elit. Amet quis similique beatae asperiores magnam odit
        fugiat quos temporibus, deserunt dolorem, voluptate hic provident
        repellat, facere libero. Minus nihil magni aliquid, atque laborum
        asperiores deserunt soluta quod enim sed veniam ex nulla nam labore
        quaerat! Sequi nostrum odio ipsum! Adipisci architecto minima, earum
        eveniet et non dolor optio, temporibus harum nostrum odio sed quo
        accusamus illum aspernatur voluptatum error nesciunt atque labore nihil!
        Ut amet nobis odit aliquam fugit repellendus id, animi voluptas labore
        ipsum hic facilis laboriosam a aut alias? Aliquid delectus quae ab
        corporis sit tenetur vero, similique quia!
      </p>

      <button type="button" onClick={test}>
        logout
      </button>
    </>
  );
};

export default showData;

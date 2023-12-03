import React from "react";
import NavBar from "./NavBar";


function ProjectList() {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <NavBar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ marginBottom: "20px", fontSize: "24px"}}>Welcome!</div>
        <div style={{ display: "flex" }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
          voluptatem perspiciatis cupiditate aliquid illo dolores et reprehenderit
          rem assumenda sint, at eaque cum repellat earum accusamus aspernatur
          officia, quidem inventore! Vel, assumenda! Voluptate molestiae fugiat
          praesentium quidem velit esse labore molestias tenetur deleniti soluta,
          iusto, et fuga amet ipsum magnam porro assumenda eveniet nostrum cumque
          perspiciatis odit quas sint enim. Quaerat, fugiat modi. Quisquam quas
          voluptates accusantium repellat hic fuga corrupti, mollitia explicabo,
          temporibus adipisci qui nisi nobis ut labore, error soluta? Laborum vel
          voluptas nostrum culpa distinctio libero quidem.
        </div>
      </div>
    </div>
  );
}

export default ProjectList;

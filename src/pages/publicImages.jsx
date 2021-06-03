import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { key } from "./upload";

// --- declaram componenta in afara functiei pentru a nu se re-crea la fiecare render
const images = {
  limit: "3",
  category: "1",
};

const PublicImages = () => {
  const [category, setCategory] = React.useState([]);
  const [receivedImages, setReceivedImages] = React.useState([]);
  const [imageRender, setImageRender] = React.useState(images);
  const numberOfImages = [3, 9, 15];

  const publicImagesUrl = "https://api.thecatapi.com/v1/images/search";

  const categoryUrl = "https://api.thecatapi.com/v1/categories";

  const getPublicImages = (imageRender) => {
    fetch(
      `${publicImagesUrl}?category_ids=${imageRender.category}&limit=${imageRender.limit}`
    )
      .then((result) => result.json())
      .then((result) => setReceivedImages(result))
      .catch((e) => console.log(e));
  };

  const getCategories = () => {
    fetch(categoryUrl)
      .then((result) => result.json())
      .then((result) => setCategory(result))
      .catch((e) => console.log(e));
  };

  function categoryHandler(e) {
    e.persist();
    setImageRender((currentObj) => {
      return { ...currentObj, [e.target.id]: e.target.value };
    });
    // getPublicImages(imageRender) // am scos chemarea functiei de a lua imaginile din handler din cauza async-ului
  }

  React.useEffect(() => {
    getPublicImages(imageRender); //--- chemam fetch-ul in useEffect si punem sa randeze la fiecare modificare a obj. images din State
    getCategories();
  }, [imageRender]);

  return (
    <>
      <select
        className='form-select bg-primary text-light'
        id='category'
        value={imageRender.category}
        onChange={categoryHandler}>
        <option value='' selected>
          Choose category
        </option>
        {category.map((cat) => (
          <option value={cat.id}>{cat.name}</option>
        ))}
      </select>
      <select
        className='form-select bg-warning text-dark'
        id='limit'
        value={imageRender.limit}
        onChange={categoryHandler}>
        <option value='' selected>
          Number of photos
        </option>
        {numberOfImages.map((num) => (
          <option value={num}>{num}</option>
        ))}
      </select>
      <Container>
        <Row>
          {receivedImages.map((image) => (
            <Col xs={6} md={4}>
              <Image
                className='w-100 h-75'
                src={image.url}
                alt={image.id}
                rounded
                fluid
              />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default PublicImages;

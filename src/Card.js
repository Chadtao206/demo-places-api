export const Card = ({ url, name }) => {
  console.log(url);
  return (
    <>
      <div class="card" style={{ maxWidth: "18rem" }}>
        <img src={url} class="card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title">{name}</h5>
          <p class="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
        </div>
      </div>
    </>
  );
};

export default Card;

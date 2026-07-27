import homeButtonImg from "./images/home_button.png";

function HomeButton({ width, height }) {

  return (
    <>
      <img src={homeButtonImg} style={{
                width: width,
                height: height,
                filter: 'drop-shadow(2px 2px 3px black)'
            }}></img>
    </>
  )
}

export default HomeButton
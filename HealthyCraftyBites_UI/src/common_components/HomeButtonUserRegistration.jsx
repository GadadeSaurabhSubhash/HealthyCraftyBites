import homeButtonImg from "./images/home_btn_user_registration.png";

function HomeButton({ width, height, onClick, className }) {

    return (

        <img
            src={homeButtonImg}
            alt="Home"
            className={className}
            onClick={onClick}
            style={{
                width,
                height,
                filter: "drop-shadow(2px 2px 3px black)",
                cursor: "pointer"
            }}
        />

    );

}

export default HomeButton;
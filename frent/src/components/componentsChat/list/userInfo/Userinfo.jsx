import "./userInfo.css"

const Userinfo = () => {
    return (
        <div className='userInfo'>
            <div className="user">
                <img src="./avatar.png" alt="" />
                <h2 >luca perez </h2>
            </div>
            <div className="icons">
                <i className="fas fa-ellipsis-v"></i>
                <i className="fas fa-edit"></i>
            </div>
        </div>
    )


}

export default Userinfo;
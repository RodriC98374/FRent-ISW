import Detail from '../detail/Detail';
import Chat from '../chat/Chat';
import List from '../list/List';
import "./ChatManage.css"

const ChatManage = () => {
    return (
        <div className='container'>
                <List/>
                <Chat/>
                <Detail/>
                
        </div>
    )


}

export default ChatManage;
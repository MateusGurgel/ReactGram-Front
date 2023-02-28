import "./Message.css";

interface messageProps {
    message: string,
    type: string,
}

const Message = (props: messageProps) => {
  return (
    <div className={`message ${props.type}`}>
      <p>{props.message}</p>
    </div>
  );
};

export default Message;
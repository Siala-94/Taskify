export default function Divider(params) {
  return (
    <>
      <div className="flex flex-col w-full ">
        <div className="divider  font-thin">{params.text}</div>
      </div>
    </>
  );
}

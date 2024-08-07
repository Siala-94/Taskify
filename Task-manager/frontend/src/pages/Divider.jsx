export default function Divider(params) {
  return (
    <>
      <div className="flex flex-col w-full border-opacity-50">
        <div className="divider divider-neutral font-thin">{params.text}</div>
      </div>
    </>
  );
}

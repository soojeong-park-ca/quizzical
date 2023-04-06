export default function StartPage(props) {
  return (
    <main className="startPageMain">
      <h1 className="startPageTitle">Quizzical</h1>
      <p className="startPageText">
        Check your knowledge on
        <br />
        <span>{props.dataCategory}</span>
      </p>
      <button className="startPageBtn" onClick={props.toggleQuizMode}>
        Start quiz
      </button>
    </main>
  );
}

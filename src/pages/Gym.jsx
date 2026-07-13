import gymVideo1 from "../assets/videos/gym-1.mov";
import gymVideo2 from "../assets/videos/gym-2.mov";

const LIFTS = [
  { name: "Deadlift", value: "405 lbs" },
  { name: "Bench", value: "255 lbs" },
  { name: "Squat", value: "295 lbs" },
  { name: "Weighted pull-up", value: "4 plates (180 lbs)" },
  { name: "Weighted muscle-up", value: "1 plate and 10 (55 lbs)" },
  { name: "Max pull-up in a row", value: "42" },
];

export default function Gym() {
  return (
    <>
      <h1>Gym Stats</h1>
      <p>
        {LIFTS.map((lift, i) => (
          <span key={lift.name}>
            <strong>{lift.name}</strong>: {lift.value}
            {i < LIFTS.length - 1 && <br />}
          </span>
        ))}
      </p>

      <div className="video-grid">
        <video src={gymVideo1} controls playsInline />
        <video src={gymVideo2} controls playsInline />
      </div>
    </>
  );
}

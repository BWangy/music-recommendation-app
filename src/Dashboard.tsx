import useAuth from "./useAuth";
import useRecommendations from "./useRecommendations";

export default function Dashboard({ code }) {
  const accessToken = useAuth(code);
  console.log(accessToken);
  const recommendations = useRecommendations(accessToken);

  return (
    <div>
      <h1>Recommended Music</h1>
      <ul>
        {recommendations && recommendations.length > 0 ? (
          recommendations.map((track) => (
            <li key={track.id}>
              {track.name} by{" "}
              {track.artists.map((artist) => artist.name).join(", ")}
            </li>
          ))
        ) : (
          <li>No recommendations available</li>
        )}
      </ul>
    </div>
  );
}

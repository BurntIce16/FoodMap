import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";
import ThumbDownRoundedIcon from "@mui/icons-material/ThumbDownRounded";

export default function ScoreButton({ score, onClick}) {
	return (
		<div className="flex flex-col items-center">
			<button onClick={() => onClick(score + 1)}>
				<ThumbUpRoundedIcon />
			</button>
            <span>{score}</span>
			<button onClick={() => onClick(score - 1)}>
				<ThumbDownRoundedIcon />
			</button>
		</div>
	);
}

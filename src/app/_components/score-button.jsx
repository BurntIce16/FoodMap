import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";
import ThumbDownRoundedIcon from "@mui/icons-material/ThumbDownRounded";

export default function ScoreButton({ score, onClick }) {
    return (
        <div className="flex flex-col items-center">
            <button onClick={() => onClick(score + 1)}>
                <ThumbUpRoundedIcon fontSize="large"/>
            </button>
            <span className={`text-xl ${score > 0 ? 'text-green-500' : score < 0 ? 'text-red-500' : 'text-gray-500'}`}>
                {score}
            </span>
            <button onClick={() => onClick(score - 1)}>
                <ThumbDownRoundedIcon fontSize="large"/>
            </button>
        </div>
    );
}

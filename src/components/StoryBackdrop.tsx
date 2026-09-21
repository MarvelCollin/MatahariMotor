import { useRoad } from '../lib/useRoad';

type StoryBackdropProps = {
  tone?: 'dark' | 'light';
  seam?: 'dark' | 'light';
};

const StoryBackdrop = ({ tone = 'dark', seam }: StoryBackdropProps) => {
  useRoad();

  return (
    <div className="road" data-tone={tone} aria-hidden="true">
      <div className="road-haze" />
      <div className="road-stage">
        <div className="road-plane">
          <div className="road-ties" />
          <div className="road-edge road-edge-left" />
          <div className="road-edge road-edge-right" />
          <div className="road-dashes" />
        </div>
      </div>
      <div className="road-fade" />
      <div className="road-beam" />
      <div className="road-streaks" />
      <div className="road-grain" />
      {seam && <div className={`road-seam road-seam-${seam}`} />}
      <div className="story-rule" />
    </div>
  );
};

export default StoryBackdrop;

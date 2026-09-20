type StoryBackdropProps = {
  tone?: 'dark' | 'light';
  pattern?: 'dots' | 'grid';
};

const StoryBackdrop = ({ tone = 'dark', pattern = 'dots' }: StoryBackdropProps) => (
  <div className={`story-backdrop ${tone === 'light' ? 'story-backdrop-light' : ''}`} aria-hidden="true">
    <div className="story-glow" />
    <div className={`story-grid story-grid-${pattern}`} />
    <div className="story-rule" />
  </div>
);

export default StoryBackdrop;

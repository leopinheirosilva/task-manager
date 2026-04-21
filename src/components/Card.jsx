const Card = ({ icon, title, subtitle }) => {
  return (
    <div className="flex h-[150px] flex-col items-center justify-center gap-1 rounded-lg bg-white">
      <div className="flex items-center gap-2">
        <span className="text-brand-primary">{icon}</span>
        <p className="text-2xl font-semibold text-brand-dark-blue">{title}</p>
      </div>
      {subtitle}
    </div>
  );
};

export default Card;

const SectionHeader = ({
  heading,
  subHeading,
}: {
  heading: string;
  subHeading: string;
}) => {
  return (
    <div>
      <h1 className="text-slate-900 text-2xl md:text-3xl font-extrabold mb-4 text-center">
        {heading}
      </h1>
      <p className="text-slate-600 text-base md:text-lg font-medium text-center">
        {subHeading}
      </p>
    </div>
  );
};

export default SectionHeader;

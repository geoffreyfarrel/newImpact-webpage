interface PropTypes {
  title: string;
}

const PageTitle = (props: PropTypes) => {
  const { title } = props;
  return (
    <div className="m-4 w-full">
      <h1 className="text-xl lg:text-2xl">{title}</h1>
    </div>
  );
};

export default PageTitle;

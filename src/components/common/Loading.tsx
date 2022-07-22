const Loading = () => {
  return (
    <svg
      className="my-3 w-full"
      width="24"
      height="24"
      viewBox="0 0 40 40"
      stroke="#F0B135"
    >
      <g fill="none" transform="translate(2 2)" strokeWidth="4">
        <circle strokeOpacity=".5" cx="18" cy="18" r="18" />
        <path d="M36 18c0-9.94-8.06-18-18-18">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 18 18"
            to="360 18 18"
            dur="1s"
            repeatCount="indefinite"
          />
        </path>
      </g>
    </svg>
  );
};

export default Loading;

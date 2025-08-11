const Button = (props: any) => {
    return (
        <button className="bg-blue-950 h-10 text-white rounded px-4 mt-3 hover:bg-gradient-to-b  hover:from-blue-950 hover:to-[#0D98BA]">
              <a
                href={props.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                BOOK NOW
              </a>
            </button>
    )
}

export default Button
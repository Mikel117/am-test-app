import Image from "next/image"

interface Props {
    width?: number;
    height?: number;
}

export const TitleImage = ({ width = 332, height = 95 }: Props) => {
  return (
    <div>
        <Image
            src="/images/rick-and-morty-title.jpg"
            alt={"Rick and Morty Title Image"}
            width={width}
            height={height}
        />
    </div>
  )
}

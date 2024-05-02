export type TextPreviewProps = {
  value: string
  className?: string
}

const TextPreview = ({ value, className }: TextPreviewProps) => {
  return (
    <div className={className}>
      {value.split("\n").map((line, index) => {
        return [line.replace(/\t/g, "\u00A0\u00A0").replace(/\s/g, "\u00A0"), <br key={index} />]
      })}
    </div>
  )
}

export default TextPreview

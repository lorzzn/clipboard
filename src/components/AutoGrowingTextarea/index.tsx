import { twclx } from "@/utils/twclx"
import { css } from "@emotion/css"
import { toString } from "lodash"
import { CSSProperties, ComponentProps, useEffect, useState } from "react"
import TextPreview from "../TextPreview"

export interface AutoGrowingTextareaProps extends Omit<ComponentProps<"textarea">, "value"> {
  wordBreak?: CSSProperties["wordBreak"]
  value?: string
}

const AutoGrowingTextarea = ({
  onInput,
  value: _value = "",
  className,
  wordBreak = "break-all",
  ...restProps
}: AutoGrowingTextareaProps) => {
  const [value, setValue] = useState<AutoGrowingTextareaProps["value"]>("")

  useEffect(() => {
    setValue(_value)
  }, [_value])

  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setValue(e.currentTarget.value)
    onInput && onInput(e)
  }

  const baseCn = twclx(["resize-none overflow-hidden !h-auto", className])

  return (
    <div className="relative">
      <TextPreview
        value={toString(value)}
        className={twclx([
          baseCn,
          css`
            visibility: hidden;
          `,
        ])}
      />
      <textarea
        className={twclx([baseCn, "!absolute inset-0"])}
        value={value}
        onInput={handleInput}
        {...restProps}
      ></textarea>
    </div>
  )
}

export default AutoGrowingTextarea

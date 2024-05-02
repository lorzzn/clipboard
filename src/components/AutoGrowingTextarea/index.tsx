import { twclx } from "@/utils/twclx"
import { css } from "@emotion/css"
import { CSSProperties, ComponentProps, useEffect, useState } from "react"

export interface AutoGrowingTextareaProps extends ComponentProps<"textarea"> {
  wordBreak?: CSSProperties["wordBreak"]
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
      <div
        className={twclx([
          baseCn,
          css`
            visibility: hidden;
          `,
        ])}
      >
        {value}
      </div>
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
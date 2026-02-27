type CheckCircleProps = {
  size?: number
}

export const CheckCircle = ({ size = 16 }: CheckCircleProps) => (
  <svg className="anim-pop shrink-0" width={size} height={size} viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="8" fill="#4ade80" />
    <path
      d="M4.5 8 7 10.5 11.5 6"
      stroke="#fff"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

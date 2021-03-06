import React, { useCallback } from 'react'
import Icon from '@ant-design/icons';

interface ILikeIconProps {
  style: object
  likeCb: () => void
}

const LikeIcon: React.FC<ILikeIconProps> = (props) => {
  const likeClick = useCallback(() => {
    props.likeCb()
  }, [props.likeCb])
  return (
      <span>
        <Icon component={LikeSvg} style={props.style} onClick={likeClick}/>
      </span>
  )
}

const LikeSvg = () => (
    <svg viewBox="0 0 1024 1024" version="1.1" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
         p-id="2140" width=".18rem" height=".18rem">
      <path
          d="M861.577 428.695h-223.037c86.425-319.186-59.547-335.487-59.547-335.487-61.867 0-49.042 48.918-53.716 57.076 0 156.096-165.796 278.407-165.796 278.407v442.661c0 43.695 59.547 59.433 82.908 59.433h335.111c31.537 0 57.221-82.709 57.221-82.709 82.903-281.911 82.903-365.789 82.903-365.789 0.001-58.247-56.046-53.591-56.046-53.591v0 0zM861.577 428.695z"
           p-id="2141"></path>
      <path
          d="M267.943 428.841h-133.553c-27.581 0-28.006 27.090-28.006 27.090l27.581 446.441c0 28.416 28.464 28.416 28.464 28.416h115.593c24.081 0 23.865-18.798 23.865-18.798v-449.296c0-34.287-33.945-33.854-33.945-33.854v0 0zM267.943 428.841z"
           p-id="2142"></path>
    </svg>
)

export default LikeIcon

import styled from 'styled-components';

export const ButtonStyled = styled.button`
	padding: ${({ theme }) => theme.spacing[1]} ${({ theme }) => theme.spacing[2]};
	font-size: ${({ theme }) => theme.typography.size.s};
	white-space: nowrap;
	border: ${({ theme }) => theme.shape.borderWidth} solid
		${({ theme }) => theme.colors.accent};
	border-radius: ${({ theme }) => theme.shape.borderRadius.s};
	color: ${({ theme }) => theme.colors.text.secondary};
	background-color: ${({ theme }) => theme.colors.background.button};
	background-image: linear-gradient(
		-180deg,
		${({ theme }) => theme.colors.lightAccent},
		${({ theme }) => theme.colors.accent}
	);
	transition: background-image,
		background-color ${({ theme }) => theme.animation.cubicBezier};
	cursor: pointer;

	&:hover {
		color: ${({ theme }) => theme.colors.text.primary};
		background-color: transparent;
		background-image: none;

		& > svg {
			fill: ${({ theme }) => theme.colors.background.button};
		}
	}

	& > svg {
		display: block;
		fill: ${({ theme }) => theme.colors.text.secondary};
	}
`;

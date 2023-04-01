import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import ChoosingColorBox from '@/components/molecules/ChoosingColor/ChoosingColor.style';
import { PickedColorInformationBox } from '@/components/molecules/ChoosingColor/ChoosingColor.style';

const MySwal = withReactContent(Swal);

export const AlertForErrors = (errorMessage) => {
  MySwal.fire({
    icon: 'error',
    title: 'Oops...',
    text: `${errorMessage !== undefined ? errorMessage : 'Something went wrong!'}`,
    showConfirmButton: false,
    timer: 2000,
  });
};

const alertForChoosingAppColor = (updateColor) => {
  const colors = ['#046ee899', '#f59e0b', '#4338ca', '#be123c'];
  let choosedColor = '#046ee899';
  const timerSeconds = 2000;

  MySwal.fire({
    title: <p>Choose the APP color!</p>,
    html: (
      <ChoosingColorBox>
        {colors.map((color) => (
          <button
            key={color}
            style={{ 'background-color': color }}
            type="button"
            onClick={() => {
              choosedColor = color;
            }}
          >
            {' '}
          </button>
        ))}
        <h3>Color Picker</h3>
        <input
          type="color"
          onChange={(event) => {
            choosedColor = event.target.value;
          }}
        />
      </ChoosingColorBox>
    ),
    confirmButtonColor: '#093588c0',
    confirmButtonText: 'Change color',
  }).then((result) => {
    if (result.isConfirmed) {
      MySwal.fire({
        title: <h3>Color Changed!</h3>,
        showConfirmButton: false,
        timer: 2000,
        html: (
          <PickedColorInformationBox>
            <p>
              New color is: <span style={{ 'background-color': choosedColor }} />
            </p>
          </PickedColorInformationBox>
        ),
        icon: 'success',
      }).then(() => {
        updateColor(choosedColor);
      });
    } else {
      AlertForErrors('Color not changed!');
    }
  });
};

export default alertForChoosingAppColor;

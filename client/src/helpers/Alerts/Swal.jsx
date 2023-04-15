import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import ChoosingColorBox, { PickedColorInformationBox } from '@/components/molecules/ChoosingColor/ChoosingColor.style';

const MySwal = withReactContent(Swal);

export const alertForErrors = (errorMessage) => {
  MySwal.fire({
    icon: 'error',
    title: 'Oops...',
    text: `${errorMessage !== undefined ? errorMessage : 'Something went wrong!'}`,
    showConfirmButton: false,
    timer: 2000,
  });
};

const alertForChoosingAppColor = (updateColor) => {
  const colors = ['#046ee899', '#f59e0b', '#4338ca', '#D50000'];
  const defaultColor = localStorage.designColor ? localStorage.designColor : '#FFB60D';
  let choosedColor = defaultColor;
  const timerSeconds = 2000;

  MySwal.fire({
    title: <p>Choose the APP color!</p>,
    showConfirmButton: false,
    html: (
      <ChoosingColorBox>
        {colors.map((color) => (
          <button
            key={color}
            style={{ 'background-color': color }}
            type="button"
            onClick={() => {
              choosedColor = color;
              MySwal.close();
            }}
          >
            {' '}
          </button>
        ))}

        <h3>Color Picker</h3>

        <input
          type="color"
          value={choosedColor}
          onChange={(event) => {
            choosedColor = event.target.value;
          }}
          onBlur={() => {
            MySwal.close();
          }}
        />
      </ChoosingColorBox>
    ),
  }).then(() => {
    if (choosedColor === defaultColor) return alertForErrors('You choosed the same color!');

    MySwal.fire({
      icon: 'success',
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
    }).then(() => {
      localStorage.setItem('designColor', choosedColor);
      updateColor(choosedColor);
    });
  });
};

export const alertForSuccessfulAction = (message) =>{
  MySwal.fire({
    icon: 'success',
    title: 'Succeed!',
    text: `${message !== undefined ? message : 'Your action was succesful!'}`,
    showConfirmButton: false,
    timer: 2000,
  });

}
export default alertForChoosingAppColor;

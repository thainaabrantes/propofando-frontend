import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clip from '../../assets/annex-icon.svg';
import arrowBack from '../../assets/arrow-back-icon.svg';
import arrowDown from '../../assets/arrow-down.svg';
import style from './styles.module.scss';

const defaultValuesForm = {
  title: '',
  description: '',
  explanation: '',
};

const defaultAlternatives = [
  {
    title: 'optionA',
    description: '',
    correct: false,
  },
  {
    title: 'optionB',
    description: '',
    correct: false,
  },
  {
    title: 'optionC',
    description: '',
    correct: false,
  },
  {
    title: 'optionD',
    description: '',
    correct: false,
  },
];

export function AddQuestion() {
  const navigate = useNavigate();
  const [form, setForm] = useState(defaultValuesForm);
  const [alternatives, setAlternatives] = useState(defaultAlternatives);
  const [selectedRadio, setSelectedRadio] = useState('');
  const titleSize = 200 - (form.title.split('').length);

  const isRadioSelected = (value) => selectedRadio === value;

  const handleRadioClick = (e) => {
    const { value } = e.target;

    const localAlternatives = [...alternatives];

    for (const alternative of localAlternatives) {
      alternative.correct = false;
    }

    const currentAlternative = localAlternatives.find((item) => item.title === value);

    currentAlternative.correct = true;

    setAlternatives([...localAlternatives]);

    setSelectedRadio(e.target.value);
  };

  function caracterTextArea(type) {
    const textSize = 1620 - type.split('').length;
    return textSize;
  }

  function handleChange(target) {
    setForm({ ...form, [target.name]: target.value });
  }

  function handleChangeAlternatives({ target }) {
    const localAlternatives = [...alternatives];

    const currentAlternative = localAlternatives.find((item) => item.title === target.name);

    currentAlternative.description = target.value;

    setAlternatives(localAlternatives);
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <main className={style.container}>
      <div className={style['page-header']}>
        <div className={style['header-back']}>
          <button
            onClick={() => navigate('/main/question-category')}
          >
            <img src={arrowBack} alt="Voltar" />

          </button>
          <h2>Categorias e questões</h2>
        </div>
        <div>
          <span>Categorias e questões / Adicionar questão</span>
        </div>
      </div>

      <div className={style['page-body']}>
        <h2>Criar questão</h2>

        <form onSubmit={handleSubmit}>
          <div className={style['div-title-category']}>
            <div>
              <label>
                Título
                <textarea
                  value={form.title}
                  name="title"
                  maxLength={200}
                  onChange={(e) => handleChange(e.target)}
                />
              </label>
              <span>
                {form.title === '' ? 200 : titleSize}
                /200
              </span>
            </div>
            <div className={style['input-select']}>
              <label>
                Categoria
                <select>
                  <option value="0">Select</option>
                </select>
              </label>
              <img src={arrowDown} alt="seta" />
            </div>
          </div>

          <div className={style['div-body-questions']}>
            <div className={style['question']}>
              <label>
                Descrição da questão
                <textarea
                  name="description"
                  value={form.description}
                  maxLength={1620}
                  onChange={(e) => handleChange(e.target)}

                />
              </label>
              <div>
                <img src={clip} alt="clip" />
                <span>Anexar mídia</span>
              </div>
              <span className={style['counter-span']}>
                {form.description === '' ? 1620 : caracterTextArea(form.description)}
                /1620
              </span>
            </div>
            <div className={style['question']}>
              <label>
                Adicionar explicação
                <textarea
                  name="explanation"
                  value={form.explanation}
                  maxLength={1620}
                  onChange={(e) => handleChange(e.target)}

                />
              </label>
              <div>
                <img src={clip} alt="clip" />
                <span>Anexar mídia</span>
              </div>
              <span className={style['counter-span']}>
                {form.explanation === '' ? 1620 : caracterTextArea(form.explanation)}
                /1620
              </span>
            </div>
          </div>
          <h3>Alternativas</h3>
          <div className={style.option}>
            <div>
              <input
                type="radio"
                name="alternative"
                value="optionA"
                checked={isRadioSelected('optionA')}
                onChange={handleRadioClick}
              />
              <span>A)</span>
            </div>

            <textarea
              name="optionA"
              value={alternatives[0].description}
              onChange={handleChangeAlternatives}
            />
            <span className={style['counter-span']}>
              {alternatives[0].description === '' ? 1620 : caracterTextArea(alternatives[0].description)}
              /1620
            </span>
          </div>
          <div className={style.option}>
            <div>
              <input
                type="radio"
                name="alternative"
                value="optionB"
                checked={isRadioSelected('optionB')}
                onChange={handleRadioClick}
              />
              <span>B)</span>
            </div>
            <textarea
              name="optionB"
              value={alternatives[1].description}
              onChange={handleChangeAlternatives}
            />
            <span className={style['counter-span']}>
              {alternatives[1].description === '' ? 1620 : caracterTextArea(alternatives[1].description)}
              /1620
            </span>
          </div>
          <div className={style.option}>
            <div>
              <input
                type="radio"
                name="alternative"
                value="optionC"
                checked={isRadioSelected('optionC')}
                onChange={handleRadioClick}
              />
              <span>C)</span>
            </div>
            <textarea
              name="optionC"
              value={alternatives[2].description}
              onChange={handleChangeAlternatives}
            />
            <span className={style['counter-span']}>
              {alternatives[2].description === '' ? 1620 : caracterTextArea(alternatives[2].description)}
              /1620
            </span>
          </div>
          <div className={style.option}>
            <div>
              <input
                type="radio"
                name="alternative"
                value="optionD"
                checked={isRadioSelected('optionD')}
                onChange={handleRadioClick}
              />
              <span>D)</span>
            </div>
            <textarea
              name="optionD"
              value={alternatives[3].description}
              onChange={handleChangeAlternatives}
            />
            <span className={style['counter-span']}>
              {alternatives[3].description === '' ? 1620 : caracterTextArea(alternatives[3].description)}
              /1620
            </span>
          </div>
          <div className={style['btn-add-question']}>
            <button className="button">Adicionar questão</button>
          </div>
        </form>
      </div>

    </main>
  );
}

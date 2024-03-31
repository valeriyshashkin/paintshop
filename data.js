const data = {
  email: "example@example.com",
  products: [
    {
      image: "/7.jpeg",
      name: "TiOTon АЛ-12",
      specification: "ТУ 20.30.12-003-05436512-2017",
      description: "Антикоррозионная алюминийнаполненная краска",
      areasOfApplication: "Применяется в качестве покрывного слоя...",
      features: [
        "обладает антикоррозионными свойствами",
        "быстро сохнет, не ухудшает свойства сварного шва, ремонтопригодно",
        "выдерживает перепад температур от минус 60 С до плюс 110 С",
        "пожаробезопасно"
      ],
      technicalSpecifications: {
        primerPaint: {
          nonVolatileSubstances: "35-45%",
          density: "0,93-0,98 г/см2",
          viscosity: "20-40 с",
          theoreticalConsumption: "70-130 г/м2",
          dryingTime: "до 30 мин"
        },
        coating: {
          dryLayerThickness: "20-30 мкм",
          colorAndAppearance: "серебристо-серое с блеском",
          adhesion: "1 балл",
          impactStrength: "не менее 50 см",
          flexibility: "не более 2 мм"
        }
      },
      surfacePreparation: "При окраске металлических поверхностей...",
      paintingConditions: "Окраска производится при температуре окружающего воздуха...",
      applicationTechnology: "Перед использованием перемешать с помощью миксера до однородного состояния...",
      applicationMethods: [
        {
          method: "Безвоздушное распыление",
          dilution: "без разбавления",
          nozzleDiameter: "0,015-0,021 (0,38-0,53) мм",
          pressure: "10-20 МПа (100-200 бар)"
        },
        {
          method: "Пневматическое распыление",
          dilution: "до 5% по массе",
          nozzleDiameter: "1,8-2,2 мм",
          pressure: "0,3-0,4 МПа (3-4 бар)"
        },
        {
          method: "Кисть/валик",
          dilution: "до 5% по массе"
        }
      ],
      packagingAndStorage: "Композиция TiOTon упакована в металлические ведра по 18 кг...",
      precautions: "Композиция TiOTon относится к 4 классу опасности по ГОСТ 12.1.007 (малоопасна)..."
    },
    {
      name: "Масляные краски",
      description: "Очень длинное описание для красок",
      price: 90,
      image: "/1.jpg",
    },
    {
      name: "Баллончик с краской",
      description: "Просто баллончик с краской",
      price: 2000,
      image: "/2.jpeg",
    },
    {
      name: "Очень-очень много розовых банок с краской",
      description: "Много",
      price: 4000,
      image: "/3.webp",
    },
    {
      name: "Банки с краской вид сверху",
      description: "Сверху всегда лучше",
      price: 5000,
      image: "/4.jpg",
    },
    {
      name: "Использованные банки с краской",
      description: "Почему бы и нет?",
      price: 100,
      image: "/5.jpg",
    },
    {
      name: "Стенка из банок с краской",
      description: "Много-много краски!",
      price: 6000,
      image: "/6.jpg",
    },
  ],
};

export default data;

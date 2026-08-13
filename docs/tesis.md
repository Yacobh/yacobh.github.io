REPUBLICA BOLIVARIANA DE VENEZUELA

UNIVERSIDAD NACIONAL EXPERIMENTAL POLITÉCNICA

“ANTONIO JOSÉ DE SUCRE”

VICE-RECTORADO DE PUERTO ORDAZ

DEPARTAMENTO DE INGENIERIA ELECTRÓNICA

TRABAJO DE GRADO

**UNEXPO**

![](./Sdiapea%20(1)_images/image-001.png)

DISEÑO DE UN SISTEMA DIGITAL INTERACTIVO DE APOYO AL PROCESO DE ENSEÑANZA-APRENDIZAJE

AUTOR: Br. Jacobo, I, Córdova, R.

C.I: xxxxx

Ciudad Guayana, Agosto del 2010

**UNEXPO**

![](./Sdiapea%20(1)_images/image-002.png)![](./Sdiapea%20(1)_images/image-003.png)

DISEÑO DE UN SISTEMA DIGITAL INTERACTIVO DE APOYO AL PROCESO DE ENSEÑANZA-APRENDIZAJE

REPUBLICA BOLIVARIANA DE VENEZUELA

UNIVERSIDAD NACIONAL EXPERIMENTAL POLITÉCNICA

“ANTONIO JOSÉ DE SUCRE”

VICE-RECTORADO DE PUERTO ORDAZ

DEPARTAMENTO DE INGENIERIA ELECTRÓNICA

TRABAJO DE GRADO

DISEÑO DE UN SISTEMA DIGITAL INTERACTIVO DE APOYO AL PROCESO DE ENSEÑANZA-APRENDIZAJE

AUTOR: Br. Córdova R. Jacobo I

Trabajo que se presenta para cumplir con el requisito de aprobación de la asignatura Trabajo de Grado.

TUTOR: Ing. Andis Rodríguez

Ciudad Guayana, Agosto del 2010

Br. Córdova R. Jacobo I.

DISEÑO DE UN SISTEMA DIGITAL INTERACTIVO DE APOYO

AL PROCESO DE ENSEÑANZA-APRENDIZAJE

Ciudad Guayana. Año: 2010

TRABAJO DE GRADO

Universidad Nacional Experimental Politécnica “Antonio José de Sucre”.

Vicerrectorado Puerto Ordaz. Departamento de Ingeniería Electrónica.

Tutor Académico: Ing. Andis Rodríguez

89 Páginas

1.  Classroom Response System 2. Sensores de tacto 3.Xbee
2.  Proceso de enseñanza aprendizaje 5. Python

**UNEXPO**

![](./Sdiapea%20(1)_images/image-004.png)

REPUBLICA BOLIVARIANA DE VENEZUELA

UNIVERSIDAD NACIONAL EXPERIMENTAL POLITÉCNICA

“ANTONIO JOSÉ DE SUCRE”

VICE-RECTORADO DE PUERTO ORDAZ

DEPARTAMENTO DE INGENIERIA ELECTRÓNICA

TRABAJO DE GRADO

**ACTA DE APROBACIÓN**

Quienes suscriben, miembros del Jurado Examinador designados por el Comité de Práctica Profesional de Grado designado por el Departamento de Electrónica, para evaluar el informe de Trabajo de Grado presentado por el Bachiller: **Jacobo Isaí Córdova Romero** portador de la cédula de identidad xxxxx titulada: “**DISEÑO DE UN SISTEMA DIGITAL INTERACTIVO DE APOYO AL PROCESO DE ENSEÑANZA APRENDIZAJE**”, consideramos que dicho trabajo cumple con los requisitos exigidos por el reglamento vigente de la asignatura, y de acuerdo con los criterios establecidos para la evaluación lo declaramos: **APROBADO**.

En Puerto Ordaz, a los \_\_\_ días del mes de \_\_\_\_\_\_\_\_\_\_ de 2010.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Prof. Prof.

Secretario del Jurado Presidente del Jurado

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Prof. Andis Rodriguez

**Tutor Académico**

DEDICATORIA

*A mi madre*

*Y a la memoria de mi padre*

AGRADECIMIENTO

Primeramente quiero dar gracias a Dios por su infinita bondad y misericordia para conmigo, quien siempre me ha ayudado en los momentos difíciles y quien derramo su sabiduría para la culminación de este proyecto.

A mi familia que siempre ha estado allí para alentarme a continuar, y quienes soportaron mi ausencia en pro de mi bienestar.

A Lilian, que me dio el ánimo para luchar por mis sueños y cambiar de rumbo oportunamente.

A mis amigos Pablo Bacouros, Alí Rosa, Richard Márquez y Henry Marval quienes me han acompañado durante todo este trayecto.

A los profesores Danilo Bolívar, Andis Rodríguez y Marlene Oliveros, quienes con sus enseñanzas me han permitido convertirme en una mejor persona.

A Ángel Salazar, por todo el apoyo que me ha brindado en el desarrollo de esta obra..

A Nilda Rivas, que ha llenado mis días de alegrías y me apoyó con especial afecto.

Muy especialmente a Noemí Romero, que con amor, esfuerzo y oraciones ha hecho de mí quien soy hoy.

A todos… Infinitas Gracias.

Índice de contenido

DEDICATORIA 6

AGRADECIMIENTO 7

INTRODUCCIÓN 13

CAPITULO I 17

EL PROBLEMA. 17

1.1Planteamiento del Problema 17

1.3 Objetivos específicos. 20

1.4 Justificación 20

1.5 Limitaciones 21

Capitulo II 22

Marco referencial 23

2.1 Antecedentes. 23

2.2 Bases Teóricas. 27

CAPITULO III 55

MARCO METODOLÓGICO 55

3.1 Tipo de estudio. 56

3.2 Diseño de la investigación 56

3.3 Tipo de investigación 56

3.4 Unidad de análisis 57

3.5 Técnicas e Instrumentos de Recolección de Datos 57

3.6 El Análisis Estadísticos de los Datos 58

3.7 Procedimientos 58

CAPITULO IV 60

DISEÑO Y RESULTADOS 60

4.1 Diseño del proyecto. 60

4.2 Plano del hardware completo. 72

4.3 Descripción de la interface en el pc. 73

CONCLUSIONES 76

RECOMENDACIONES 79

Anexos 80

Anexo 1 80

Anexo 2; Flujogramas de Programa principal e interrupción 85

BIBLIOGRAFÍA 92

Índice de tablas

Tabla 1: Concepciones Didácticas, Torre (2001:114) 27

Tabla 2: Pin Assignments for the XBee PRO ZNet 2.5 Modules 47

Tabla 3: Caracteristicas electricas del Módulo Xbee 47

Tabla 4: Estructura de la trama enviada por el módulo 48

Tabla 5: Formato de la trama de datos 69

Tabla 6: Comportamiento del sistema. 71

Indice de Figuras

Figura 1: La enseñanza como proceso comunicativo, según Heinemann (en Torre, 2001:110). 28

Figura 2: Componentes tecnicos e interacción de un clasroom response sistem 36

Figura 3: Modelo OSI 40

Figura 4: Promotores de la Alianza ZigBee 43

Figura 5: Conexiones mínimas requeridas para el Xbee 46

Figura 6: Modelos de pulsadores 50

Figura 7: sensor de tacto inductivo 51

Figura 8: Visión global del sistema 58

Figura 9: Esquema modular de circuito en el pupitre 60

Figura 10: Sensor de tacto 61

Figura 11: Latch Rs 62

Figura 12: Control de los botones 62

Figura 13: Descripción de los pines 64

Figura 14: Software X-CTU 65

Figura 15: Placa Zigbee explorer serial 66

Figura 16: Configurando el módulo con X-CTU 67

Figura 17: Plano del hardware 72

Figura 18: Desarrollo de interfaz en glade 73

Figura 19: Software de adquisición, procesamiento y presentación 74

INTRODUCCIÓN

El avance de las tecnologías en los diversos ámbitos de la vida, ha hecho su inclusión en la educación en lo que se conoce como la tecnologías de información y comunicación. Con la finalidad de facilitar el proceso de enseñanza aprendizaje, se han introducido en el aula algunos elementos como pueden ser los video proyectores, computadoras, pizarras inteligentes, y se ha empleado para algunas materias recursos web, como foros, chat, páginas tipo servidor, etc, que faciliten el aprendizaje fuera del aula de clase, ante tal avance de soportes existe lo que se conoce con el nombre de classroom response system CRS o en español sistema de respuesta del aula de clases, que es un sistema que permite mejorar la interactividad dentro del salón de clases, durante el transcurso de la misma.

Dicho sistema, está constituido por diversos dispositivos que envían las respuestas de los estudiantes ante diversas preguntas planteadas por el docente en el transcurso de la clase, y mediante las cuales el profesor podrá llevar un control adecuado de lo que está ocurriendo en el proceso de aprendizaje en el grupo como un todo.

La presente investigación, se propone realizar un sistema con las características de un CRS, basado en sensores de tacto colocados en los pupitres con alimentación independiente, y comunicados de manera inalámbrica con un nodo coordinador que maneje las repuestas de todos los estudiantes dentro del salón de clase. Además es necesario que estas respuestas sean procesadas y emitidas en un diagrama que exprese la opinión del público.

Este informe está estructurado en diversos capítulos, en el capítulo 1 se establece la problemática presente, y el porqué de la implementación de este sistema, en el capítulo 2 se hace una revisión documental de los distintos enfoques del proceso de enseñanza aprendizaje, de las características de los CRS, y de diversos elementos electrónicos involucrados en el proceso, en el capítulo 3 se explica la orientación con la que fue realizado este trabajo así como los procedimientos realizados para lograr su culminación, ya en el capítulo 4 se explica detalladamente las partes constitutivas del sistema, y la explicación de su funcionamiento a nivel electrónico Finalmente se presentan las conclusiones, recomendaciones, apéndices, anexos y referencias bibliográficas.

RESUMEN

Córdova Jacobo (2010) DISEÑO DE UN SISTEMA DIGITAL INTERACTIVO DE APOYO AL PROCESO DE ENSEÑANZA-APRENDIZAJE”. Departamento de Ingeniería Electrónica de la Universidad Nacional Experimental Politécnica “Antonio José de Sucre” UNEXPO, Vicerrectorado Puerto Ordaz. Trabajo de Grado. Tutor Académico: Ing. Andis Rodríguez

RESUMEN

El siguiente trabajo de investigación trata sobre el diseño de un sistema digital interactivo de apoyo al proceso de enseñanza aprendizaje, dicho sistema es conocido con el nombre de classroom response system; se presenta el diseño de un sistema de sensores de tacto ubicados en los pupitres de un salón genérico, que presentaran cuatro (4) opciones y un botón de enter, se utilizaron compuertas lógicas, para el desarrollo de los botones, módulos de comunicación xbee, y se desarrollo un programa de manejo en el lenguaje de programación python, con una interfaz gráfica desarrollada en glade. La comprobación se realizo por observación directa de las entradas versus las salidas presentadas en el computador, Debido a que los resultados obtenidos experimentalmente son satisfactorios, se recomienda su utilización como equipo de enseñanza.

**Palabras clave:**

1.Classroom Response System 2. Sensores de tacto 3.Xbee

4\. Proceso de enseñanza aprendizaje 5. Python

CAPITULO I

 EL PROBLEMA.

1.1Planteamiento del Problema

 Actualmente la sociedad esta ante las puertas de una nueva era, algunos autores la han llamado la era del conocimiento, la era de la información, la era de la información electrónica, la cual se caracteriza por el valor de la información, lo que se ha llamado el capital tecnológico, y su movilización a través de redes de comunicación. Internet, la mayor de estas redes públicas, está en constante crecimiento, aumentando de esta forma la cantidad de información disponible a nivel mundial. Esto ha derivado en una súper-inflación de la información, nunca antes en ninguna era se había tenido al alcance tanta cantidad de conocimiento, de forma tan accesible y rápida. Algunos estudios revelan que diariamente se publica en la red más información de la que una persona podría aprender en toda su vida.

En este panorama, se puede apreciar el papel de la educación en grave riesgo, debido a que las expectativas de aprendizaje están cayendo debajo del nivel necesario; existe una falla de sincronización entre la velocidad con la que se aprende y la información que se recibe, por tanto se debe acelerar el proceso de enseñanza aprendizaje, de manera que sea más eficiente. Tomando un enfoque industrial se podrá ver el aula de clases como una planta, en la que ocurre el proceso de enseñanza-aprendizaje. Uno de los caminos para optimizar una planta es a través de la teoría de control. Actualmente el control del proceso enseñanza aprendizaje se basa en la aplicación de pruebas escritas, cada cierto tiempo, y basado en la sumatoria de los resultados se maneja la calidad del producto final. Desde este punto de vista el proceso de enseñanza-aprendizaje es un proceso social con control discreto.

En la Unexpo Puerto Ordaz, el promedio de años en el que se gradúa un estudiante es de 8.2 años, siendo el necesario 5 años. Esto deja la universidad como una industria con una eficiencia del η=5/8.2= del 0.6.  

Desde la perspectiva de esta investigación el problema planteado anteriormente radica en

1.1.1 La frecuencia de muestreo con la que se realiza el control.

Dentro de la teoría de control discreto, se conoce, que entre mayor es el periodo de muestreo, más descontrolada y menos eficiente es una planta, mientras que se si reduce; sus parámetros de repuesta temporal, llegan a ser muy buenos, causando menor sobre impulso y con un tiempo de respuesta más corto. Por tanto la aplicación de estas pruebas que son el mecanismo de muestreo con las que el profesor evalúa deberían ser muy frecuentes, y de esta manera poder corregir a tiempo, los errores que el estudiante cometa.

Sin embargo esto ameritaría por parte del profesor una cantidad de trabajo superior que podría devenir en una ausencia de tiempo para preparar las clases, o lo que es peor aún, tendría que invertir tiempo extra de su trabajo en corregir exámenes, lo que es conocido como llevar trabajo a la casa, una práctica que se realiza en el presente, pero que sería acentuada si se redujera el tiempo entre evaluación y evaluación.

1.1.2 Evaluación continua.

Desde hace un tiempo se comenta en el ambiente educativo el concepto de evaluación continua, y se concibe como una evaluación que el docente debe llevar durante cada clase. También se utilizan nombres como evaluación diagnostica, evaluación formativa y evaluación acumulativa, permitiendo un control sobre el proceso de enseñanza aprendizaje muy efectivo.

Sin embargo el sistema evaluativo aún es muy lento y trabajoso, el profesor debe entregar, dictar o copiar en la pizarra la prueba, introduciendo ruido al sistema, debe evitar que los alumnos se copien, debe responder dudas individuales una y otra vez para finalmente llevarse los registros escritos de los estudiantes, para su posterior corrección que según el reglamento universitario deben ser tres días hábiles a partir del momento en que se efectúa la evaluación, mas en la realidad, dura hasta una semana, y en algunos casos mucho mas.

Con base en lo antes expuesto, y buscando optimizar la manera de educar, se propone la fabricación de un sistema de soporte al proceso de enseñanza-aprendizaje. Tal sistema está constituido por varios dispositivos de interacción a disposición de cada participante, los cuales permitirán responder en tiempo real preguntas que sean mostradas en el pizarrón, un procesador que asume el rol de servidor de la red inalámbrica punto-multipunto, conectado a un dispositivo de proyección que enviará a la  pantalla contenidos, permitiendo la evaluación en tiempo real de preguntas tipo selección simple. Con esta herramienta en el aula de clases, la frecuencia de evaluación se aumentará y el sistema se optimizará.

Para efectos de esta investigación, se realizarán 4 dispositivos de interacción (esclavos), un dispositivo receptor (maestro), y un software de manejo de resultados.

 1.2 Objetivo General.

Diseñar y fabricar un sistema digital de recolección, procesamiento y presentación de respuestas emitidas por los estudiantes en el proceso de enseñanza aprendizaje.

1.3 Objetivos específicos.

-   Diseñar un diagrama de flujo que explique el manejo de la información desde el dispositivo en el pupitre al pizarrón.
-   Seleccionar el microprocesador que mejor se adapte a las necesidades del sistema.
-   Diseñar un diagrama de flujo que represente el comportamiento del software que manejara el micro controlador.
-   Codificar el Programa de manejo del Microprocesador
-   Establecer una red de comunicación entre los dispositivos.
-   Escoger el lenguaje de programación que permita desarrollar el software necesario para la gestión de datos por parte del computador.
-   Montar el prototipo del *classrom response system*.

1.4 Justificación

Esta investigación busca sentar un precedente en la fabricación de dispositivos de respuesta inmediata en el ámbito educativo, los cuales servirán para acelerar, optimizar y hacer más uniforme el proceso de enseñanza aprendizaje. Siendo la educación un elemento fundamental en el desarrollo de la sociedad y del individuo, una mejora en su funcionamiento devendrá en una mejora social e individual. Al automatizar los sistemas de evaluación tanto los alumnos como el profesor y el departamento podrán estar al tanto de lo que sucede, haciendo el proceso más transparente y permitiendo corregir los errores a tiempo.

Por otro lado con este trabajo se plantea investigar y aumentar los conocimientos sobre la puesta en marcha de proyectos con el protocolo de comunicación inalámbrica *Zigbee.*

1.5 Limitaciones

Por tratarse de un sistema inalámbrico, la alimentación de los dispositivos se convierte en un problema técnico. En vista de la complejidad del sistema entero, solo se realizará un prototipo.

Capitulo II

Marco referencial

2.1 Antecedentes.

Siendo el salón de clases el lugar donde ocurre un proceso de interacción entre los profesores y los estudiantes, la necesidad de conocer el estatus del proceso a través de las respuestas dadas por los estudiantes ha sido motivo de preocupación de muchas personas que han abordado el problema desde distintas maneras. Así podemos encontrar para el año de 1967 Richard T. Cella introduce una patente norteamericana bajo el número 3304627, en el que se detalla un disco que el encuestado tendría en su pupitre, y al cual el instructor al mirar su parte trasera observaría si respondieron acertadamente una pregunta de respuesta múltiple. Para julio de 1971 otro dispositivo educacional se registra bajo el número de patente 3591930 por Little James, dicho aparato, era una máquina automática, eléctricamente controlada y manejada por un motor, tal aparato debía ser programado por el instructor a través de tarjetas programadas. Y el estudiante recibiría el resultado de sus preguntas como buenas o malas, mientras un contador almacenaba su puntaje.

En abril de 1972 se introduce otra patente bajo el número 3656243 que mostraba un sistema de respuesta, con métodos computacionales mejorados y aparatos, este sistema, colocaba al instructor un computador, que cableado hasta cada puesto de los estudiantes registraba las respuestas de cada estudiante, estaba formado por compuertas lógicas y latches. Y las tarjetas programadas debían ser colocadas en el computador del instructor. Luego al llegar al año 1991 con el avance de la tecnología computacional Abrahamson introduce bajo el número de patente 5002491 un sistema electrónico de repuesta personal, que consiste en un computador central IBM, un VCR o elemento video proyector y periféricos cableados hasta los pupitres de los estudiantes; tal diseño tenía muchas mejoras con respecto a sus predecesores, permitía recibir no sólo repuestas de selección simple, también otro tipo de datos, trabajaba con un software de evaluación de preguntas programable, y además permitía observar tanto el desempeño individual como el desempeño grupal en gráficos de barras y de pastel.

Posterior a esto muchos dispositivos de este tipo fueron creados con diversas innovaciones y con diversos tintes entre los que podemos mencionar los siguientes números de patente. 3943641, 4290141, 4764120, 5226177. etc.

Sobre el uso y efectividad de este tipo de sistemas podemos referenciar a ciertos autores que los han estudiado desde diversas perspectivas.

En 2007 dos profesores Maryfran Barber and David Njus, publican un *paper* sobre la evolución de los clikers, en el cual destacan que para el año 2004 empezaron a usar en la Universidad del Estado de Wayne (EEUU) Audencie Response System (ARS) o sistema de respuesta de audiencia con tecnología de infrarrojos (IR) muy costoso. Y que a comienzos de 2005 fueron disponibles comercialmente otros ARS con tecnología de radiofrecuencia (RF) de muy bajo costo, finalmente hacen un análisis comparativo entre los diversos ARS o “clikers” como son llamados en el *paper*, presentes en el mercado. El cuadro compara las empresas Qwizdom, TurningPoint, Interwrite PRS, iCliker, y H-ITT.

Posteriormente muchas universidades han incluido sistemas de respuesta personal, y han hecho diversos estudios sobre cómo estos sistemas mejoran el sistema de enseñanza aprendizaje, entre ellos cabe mencionar a Keng Siau, Hong Sheng, Fiona Fui-Hoon Nah quienes en el año 2006 realizaron un estudio que demuestra cuantitativamente y cualitativamente el aumento de la interactividad en el aula con el uso de el CRS.

También se puede nombrar a Roger C. Lowery, Ph.D. quien para el año 2005 realiza para la universidad de Carolina del Norte en Estados Unidos, un *paper* que muestra las ventajas de estos sistemas y algunas consideraciones a tener en cuenta a el momento de adquirir esta clase de sistemas. Ashley Deal para Carneigge Mellon University en nov. 2007 explica; que es un CRS, como se utiliza, y sus beneficios, da además estadísticas y valores de estudios que sustentan el uso de estos sistemas. Finaliza alentando a cualquier profesor del carneige mellon a contactar a un número telefónico si está interesado en aplicar esta técnica a sus clases. Carmen Hedwig Fies para la Universidad de Texas en Austin (2005) realiza una disertación para grado de doctor en filosofía, en el que analiza la participación y la emoción de los estudiantes como factores en el uso de los CRS, hace hincapié en el hecho del anonimato como medio de participación que evita las consecuencias negativas de una respuesta errónea, analiza además como estos factores son efectivos métodos de aprendizaje. Por otro lado concluye que si los profesores no se involucran activamente podrían perder los beneficios que esto da; dice por ejemplo que los profesores deben recibir instrucción bajo este mismo sistema, para que luego puedan darlo a los estudiantes.

Otros estudios además revelan lo útil que puede ser este sistema para diversas materias Jeffrey T. Johnson, (2005) comenta la introducción de un CRS a una clase de dentistas pediátricos, y como fue su aceptación la cual resulto positiva, y por tanto un equipo de la universidad de Kentucky se dedicara a crear un proyecto piloto. Así también podemos encontrar a Ian D. Beatty, William J. Gerace, William J. Leonard, and Robert J. Dufresne quienes explican cómo podría ser más efectivo este sistema en su aplicación sobre la materia de física.

Pero no es únicamente en los EE.UU. Donde la educación se une con la tecnología también Sally A. Gauci, Arianne M. Dantas, David A. Williams and Robert E. Kemm, en Australia, hacen un estudio sobre su impacto en la escuela de medicina y una materia de fisiología.

El uso de un sistema de respuesta personal para el aula de clases podría también ser substituido por computadoras para cada estudiante, conectadas en red, esto podría acarrear otra clase de problemas tal como lo menciona J. Roschelle quien advierte el peligro de permitir en una red dentro del aula el acceso a Internet, haciendo una nota sobre lo efectivo que puede ser un CRS sencillo, admite que el uso de estas tecnologías representa nuevos retos en lo concerniente a hallar el equilibrio entre el mundo pedagógico y el mundo informático.

Sin embargo, el debate sobre el uso de las Tic esta aun sobre el tapete, y su discusión excede los límites de esta investigación.

A nivel de investigación y proyectos que diseñen este tipo de dispositivos podemos encontrar en la Universidad Complutense de Madrid un trabajo por Fernando de la Parra Gimeno, Óscar Quintanilla Artero y Julio Tórtola del Moral (2007), en el que se desarrolla un CRS con tecnología de comunicación Xbee, y el uso de los microprocesadores PIC18LF4620 y el PIC18LF4550, a través del kit de desarrollo PICDEM Z, para el entorno de software que captaría las respuestas de los estudiantes se utilizo el lenguaje de programación c# incluido en el entorno de Microsoft Visual Studio .NET.

También se ha encontrado por Edwin Santiago Borja Ramirez y Wilmer Rafael Andrango Díaz (2007) para la Escuela Politecnica Nacional, un sistema para sufragio es decir para votaciones en Quito Perú, en el cual se utilizo la tecnología de comunicación Zigbee el PIC18LF4620 y el kit de desarrollo PICDEM Z La creación del programa de administración del sistema de votación es realizado mediante Visual Basic 2005 Express, la base de datos seleccionada para almacenar los datos es Microsoft SQL

2.2 Bases Teóricas.

2.2.1 Proceso de enseñanza-aprendizaje.

Existen muchas concepciones acerca de lo que es el proceso de enseñanza-aprendizaje, esta serie de eventos, que permiten a una persona ir de un lugar de menor conocimiento a otro de mayor conocimiento, Joyce, B. y Weil, M. (1985) afirman que “Un modelo de enseñanza es un plan estructurado que puede usarse para configurar un curriculum, para diseñar materiales de enseñanza y para orientar la enseñanza en las aulas...Puesto que no existe ningún modelo capaz de hacer frente a todos los tipos y estilos de aprendizaje, no debemos limitar nuestros métodos a un modelo único, por atractivo que sea a primera vista.”

Además agregan los elementos constitutivos de un modelo de enseñanza en

\-Teoría subyacente

\-Sintaxis: fases del modelo

\-Sistema social: clima social

\-Principios de reacción: incentivos motivadores

\-Sistema de apoyo: requisitos para que funcione

\-Efectos didácticos: objetivos que se persiguen

\-Evaluación

Clasifican los distintos modelos en 4 familias

1\. Modelos diseñados para procesar la información

2\. Modelos para el desarrollo personal

3\. Modelos para el desarrollo de las relaciones sociales

4\. Modelos conductuales .

Por otro lado Gerardo Meneses Benítez (2007) citando a Contreras (1990:23) define el proceso de enseñanza-aprendizaje como un “sistema de comunicación intencional que se produce en un marco institucional y en el que se generan estrategias encaminadas a provocar el aprendizaje” hace además un análisis de los elementos constitutivos de el proceso de enseñanza aprendizaje o del acto didáctico como prefiere llamarlo, menciona que Torre (2001) relaciona las diferentes concepciones didácticas con los procesos de enseñanza – aprendizaje que generan: la comunicación, la sistémica y el currículum. Se trata de tres maneras de entender las relaciones entre docente, discente, contenidos, estrategias y prácticas:

\- La comunicación como la primera vía de transmisión educativa.

\- La visión curricular que atiende a las metas u objetivos a lograr junto a los pasos o acciones para conseguirlos.

\- El enfoque de sistemas que presenta los elementos implicados como elementos de entrada, de proceso y de salida de un sistema abierto y dinámico

A modo de síntesis la tabla que proponemos a continuación resume las tres perspectivas presentadas, siguiendo a Torre (2001)

Por lo tanto se ha de resumir diciendo que la educación puede tratarse con respecto *a sus objetivos* en 4 modelos que hacen enfoque en el procesamiento de la información, en el desarrollo personal, en el desarrollo social y en el cambio conductual, y el enfoque con el que se desarrolla la educación esto es; *el modo* de lograrlo se puede dividir en un enfoque basado en la comunicación, otro basado en el plan curricular, y otro basado en las variables de entrada y salida.

2.2.1.1 Modelos educativos.

Para tener una idea de los que son los diversos modelos educativos, citaremos un resumen hecho por la Fundación Chile de las diferentes teorías educativas.

Para efectos de síntesis, solo se consideran los aspectos más relevantes de las propuestas de los últimos tiempos en torno al desarrollo de teorías de aprendizaje. Cada una de ellas ha ido surgiendo en un contexto propio, en momentos determinados del avance del conocimiento humano, con diferentes focos de preocupación.

Sin embargo, dos grandes sistemas de la filosofía griega de la Antigüedad: el de Platón y el de Aristóteles, quienes proponen teorías del conocimiento distintas y, en consecuencia, concepciones del aprendizaje diferentes. Sus planteamientos se mueven en el plano de las divergencias entre el idealismo y el realismo.

De Sócrates cabe mencionar su aporte a la filosofía en cuanto a su oposición a los sofistas. Los mismos problemas a los que intentan dar respuesta los sofistas ocupan a Sócrates. Pero las diferencias son profundas, la principal: los sofistas se presentan como “maestros del saber”, Sócrates tan sólo como un hombre que “busca” el saber. En esa búsqueda se enfrenta a la actitud escéptica, relativista e individualista de los sofistas: Sócrates mantiene el convencimiento de que la verdad existe y que su valor es universal, no sujeta, por tanto, a las variables “opiniones” de los individuos. Particular interés para pedagogos es el método que Sócrates emplea en su búsqueda de la verdad, el “diálogo”, con lo que se opone de nuevo a los sofistas “encerrados” en sus discursos retóricos.

Avanzando en el tiempo, el racionalismo moderno, que se inicia con R. Descartes (1596 – 1650), plantea que la idea tiene realidad en primer lugar y fundamentalmente como “acto de pensamiento”. Las ideas básicas son innatas. Su origen y su valor no dependen de la experiencia sensible; se fundan únicamente en la facultad de pensar. El sujeto adquiere autonomía y la razón pasa a ser el criterio último de legitimación.

En otro salto histórico y contraponiendo otro punto de vista en que se niega la existencia de ideas innatas, considerando el valor del conocimiento sólo por la garantía de la experiencia, el empirismo inglés del siglo XVIII planteaba que el conocimiento es una copia o representación de la realidad y, como la “realidad es única y objetiva”, esta es conocida de manera pasiva a través de los sentidos por el individuo, en donde éste sólo tiene que “abrir los ojos y mirar”, por así decirlo. A partir de esta concepción, varias teorías del procesamiento de la información, de la memoria como almacenamiento, de los esquemas, se incluyen dentro de esta influencia.

Los inicios de la Psicología de la Educación, a partir de finales del siglo XIX, están marcados por la transición de lo filosófico a lo experimental, empleando nuevos métodos de investigación por figuras tan importantes como Francis Galton (1822 – 1911), que utilizó por primera vez los tests para medir la causa de las diferencias individuales. Se estudia el desarrollo infantil para abordar la educación del alumno, y se fundan laboratorios para estudios experimentales de la mente.

El proceso de aplicación en la educación de todos los avances en el desarrollo de la nueva rama de la Filosofía, la Psicología, se da en dos postulados o teorías diferentes para entender el proceso de conocer, del aprendizaje: el estructuralismo y el funcionalismo. E. Titchener (1867 – 1927) utiliza el método de *introspección* para investigar la mente; una clase de autoanálisis con el que se examinan las percepciones y sensaciones más inmediatas. Con estos elementos se extrapolan conclusiones para explicar procesos del conocer como el aprendizaje.

William James (1842 – 1910) plantea frente al estructuralismo, el funcionalismo. Retoma del empirismo inglés, la convicción de que la experiencia es el punto de partida para examinar el pensamiento. Pero su visión se aparta del empirismo cuando afirma que las ideas simples no son copias pasivas de los datos del medio, ni las ideas se forman por asociación, sino que son producto del pensamiento y del estudio.

En síntesis, este período se caracteriza por el interés en “psicologizar” el contexto educativo. Sin embargo, el hecho de que el estructuralismo, debido a lo reducido de su programa, y el funcionalismo, por el contrario, a la excesiva amplitud de sus líneas de investigación, no ofrecieran unos resultados convincentes, lleva al abandono de ambos y al ascenso del conductismo.

Entre el final del siglo XIX y la primera parte del XX, surgen varios autores que han sido considerados dentro de la teoría de aprendizaje llamada conexionista o asociacionista:

Thorndike (1874 – 1949), Iván Pavlov (1849 – 1936), Vladimir Bechterev (1857 – 1927), entre otros, son los precursores con sus estudios sobre condicionamiento. Posteriormente John Watson (1878 – 1958), le pone el sello personal al conductismo con sus opiniones sobre el aprendizaje, aplicando las investigaciones de Pavlov.

Sin embargo este enfoque se impone y divulga a través de muchos estudios y experiencias realizados durante gran parte del siglo XX, gracias a los nuevos aportes que desarrolla Skinner, Mager y otros.

En paralelo, surge la teoría cognitiva a mediados del siglo XX, como reacción que busca una fundamentación centrada en los procesos humanos y no como generalización de la conducta animal para explicar el aprendizaje.

Desde los inicios del desarrollo de esta nueva teoría, con los aportes de la psicología de la Gestalt, luego Gagné con el procesamiento de la información, y posteriormente con Piaget y la teoría psicogenética, Bruner con su teoría del Desarrollo cognitivo, Ausubel con la teoría del aprendizaje significativo, entre otros.

El papel que juega la interrelación sujeto-medio social en el desarrollo del aprendizaje, el rol de las emociones, el lenguaje, se manifiesta en la elaboración de nuevas teorías y variedades de interpretaciones. Es así como un movimiento de fuerte impacto en la educación se aprecia a partir de los últimos 20 años con los aportes del psicólogo Lev Vigotsky.

La teoría del origen sociocultural de los procesos psicológicos superiores, de Vigotsky y sus desarrollos posteriores, son los aportes de mayor significación y vigencia en numerosas iniciativas educacionales, que han inspirado nuevos diseños curriculares y metodologías didácticas.

Junto a lo anterior, los aportes de Howard Gardner en torno al concepto de inteligencias múltiples y Daniel Goleman con el relevamiento de su concepto de inteligencia emocional en la participación del desarrollo del aprendizaje, han configurado un conjunto de ideas fuerza que impregnan los actuales postulados educativos en la mayor parte del mundo.

Por otra parte, también es necesario mencionar los aportes de Reuven Feuerestein y las teorías de la Modificabilidad Cognitiva y del Aprendizaje Mediado.

Finalmente, en nuestros días surge el concepto de constructivismo, que se ha confundido con una teoría del aprendizaje sin serlo, y que también se le atribuye a Vigotsky su paternalidad, sin ser efectivo. Pero es necesario examinar, entonces, qué es y cual es el aporte del constructivismo en la esfera de las teorías del aprendizaje.

En la década de los 70´s, las propuestas de Bruner sobre [el Aprendizaje](http://www.monografias.com/trabajos5/teap/teap.shtml) por Descubrimiento estaban tomando [fuerza](http://www.monografias.com/trabajos12/eleynewt/eleynewt.shtml). En ese momento, las escuelas buscaban que los [niños](http://www.monografias.com/trabajos16/espacio-tiempo/espacio-tiempo.shtml) construyeran su [conocimiento](http://www.monografias.com/trabajos/epistemologia2/epistemologia2.shtml) a través del descubrimiento de contenidos. Ausubel considera que el aprendizaje por descubrimiento no [debe](http://ads.us.e-planning.net/ei/3/29e9/cfa010f10016a577?rnd=0.06933999806642532&pb=c97feb55362b67d9&fi=780fdd267320ce10&kw=debe) ser presentado como opuesto al aprendizaje por [exposición](http://www.monografias.com/trabajos7/expo/expo.shtml) (recepción), ya que éste puede ser igual de eficaz, si se cumplen unas características. Así, el aprendizaje escolar puede darse por recepción o por descubrimiento, como [estrategia](http://www.monografias.com/trabajos11/henrym/henrym.shtml) de [enseñanza](http://www.monografias.com/trabajos15/metodos-ensenanza/metodos-ensenanza.shtml), y puede lograr un aprendizaje significativo o memorístico y repetitivo.

De acuerdo al [aprendizaje significativo](http://www.monografias.com/trabajos6/apsi/apsi.shtml), los nuevos conocimientos se incorporan en forma sustantiva en la [estructura](http://www.monografias.com/trabajos15/todorov/todorov.shtml#INTRO) cognitiva del alumno. Esto se logra cuando el estudiante relaciona los nuevos conocimientos con los anteriormente adquiridos; pero también es necesario que el alumno se interese por aprender lo que se le está mostrando.

El principal aporte es su [modelo](http://www.monografias.com/trabajos/adolmodin/adolmodin.shtml) de enseñanza por exposición, para promover el aprendizaje significativo en lugar del aprendizaje de memoria. Este[modelo](http://ads.us.e-planning.net/ei/3/29e9/cfa010f10016a577?rnd=0.9061531706247479&pb=9d777a1ac3588916&fi=780fdd267320ce10&kw=modelo) consiste en explicar o exponer hechos o ideas. Este enfoque es de los más apropiados para enseñar relaciones entre varios conceptos, pero antes los alumnos deben tener algún conocimiento de dichos conceptos. Otro aspecto en este modelo es la edad de los estudiantes, ya que ellos deben manipular ideas mentalmente, aunque sean simples. Por esto, este modelo es más adecuado para los niveles mas altos de primaria en adelante. 

Otro aporte al [constructivismo](http://www.monografias.com/trabajos11/constru/constru.shtml) son los organizadores anticipados, los cuales sirven de apoyo al alumno frente a la nueva información, funciona como un puente entre el nuevo material y el conocimiento actual del alumno. Estos organizadores pueden tener tres propósitos: dirigir su [atención](http://www.monografias.com/trabajos14/deficitsuperavit/deficitsuperavit.shtml) a lo que es importante del material; resaltar las relaciones entre las ideas que serán presentadas y recordarle la información relevante que ya posee.

2.2.1.2 Variables del Proceso evaluativo.

El proceso evaluativo forma parte fundamental del proceso de enseñanza aprendizaje según lo menciona Coll quien afirma que el proceso evaluativo nunca puede ser un fin en sí mismo, sino que siempre está condicionado por una finalidad en pro del sistema E-A. Además agrega que es un tema delicado debido a que “ Si nos fijamos ahora en la evaluación educativa, la primera constatación que se impone es la extensa gama de posibilidades existentes respecto al objeto mismo de la evaluación: podemos evaluar desde el sistema educativo, en su conjunto, hasta cualquiera de su segmentos o niveles; podemos evaluar los condicionantes socioeconómicos del sistema y también su funcionamiento; tomando como unidad de análisis los procesos de enseñanza /aprendizaje; podemos identificar aún otros objetos de la evaluación educativa: los objetivos, el material, la metodología didáctica, el comportamiento del profesor, el ambiente de aprendizaje, los resultados del aprendizaje realizado por el alumno,... e, incluso, el proceso mismo tomado en su globalidad. Así pues, no debe perderse de vista que el aprendizaje de los alumnos es sólo uno de los objetos susceptibles de la evaluación educativa, y no necesariamente el más pertinente para el análisis de las causas del fracaso escolar. En segundo lugar, la evaluación conduce a emitir un juicio, una valoración, que surge de comparar un conjunto de informaciones relativas al objeto evaluado, con unos criterios previamente establecidos. Este punto es esencial, pues demasiado a menudo se confunde, por ejemplo, la evaluación del aprendizaje con la medición del aprendizaje, es decir, con el conjunto de técnicas y procedimientos que sirven para recoger las informaciones relativas al aprendizaje efectuado por los alumnos. Si bien es cierto que la riqueza y la calidad de estas informaciones condicionan decisivamente el proceso evaluativo, no lo es menos que éste tiene un componente propio y específico, que consiste en comparar dichas informaciones con los criterios previamente establecidos. Evaluar no es, pues, sinónimo de medir.

Por otra parte, la existencia de un juicio valorativo como elemento que define y caracteriza la evaluación pone de manifiesto que tan importante es la información recogida como los criterios con los que se compara. La referencia a unos criterios convierte la simple medición del aprendizaje con una evaluación. En el caso del aprendizaje escolar, estos criterios suelen adoptar la forma de niveles de exigencia, los objetivos a alcanzar mediante el proceso de enseñanza/aprendizaje. Por supuesto, la naturaleza y el grado de exigencia que fijan los criterios es el fruto de una decisión previa. Quizás sea éste el punto en el que se manifiesta con mayor claridad la naturaleza intrínseca social de la educación y, consecuentemente, de las prácticas evaluativas; la elección de los criterios con relación a los cuales se compara el aprendizaje de los alumnos traduce, inevitablemente, un sistema de valores y, a través de él, unas opciones ideológicas y culturales más o menos coherentes y conscientes. Es una razón de peso para desconfiar de los planteamientos exclusivamente técnicos o psicológicos del proceso evaluativo, que descontextualizan la educación, situándola al margen del complejo entramado de factores sociales en el que tiene lugar.

Finalmente, como se señaló anteriormente, el proceso evaluativo no se agota en sí mismo: se evalúa siempre con alguna finalidad, y a menudo con el propósito de disponer de una base más sólida para tomar decisiones de diverso orden. El tipo de decisión a cuyo servicio está el proceso evaluativo es sin duda el elemento rector de este último, ya que condiciona en gran parte la naturaleza de la información que debe recogerse, los criterios con los que se comparará y también el cómo y el cuándo de la evaluación.”

2.2.2 Sistemas de respuestas del Aula de clases

Los sistemas de respuesta del aula de clases o Classroom response systems (CRSs) son definidos por Ashley Deal como “cualquier sistema usado cara a cara para consultar a los estudiantes y tener realimentación inmediata en respuestas expuestas por el instructor. \[…\] los últimos 30 años, los ingenieros han desarrollado y refinado los sistemas de respuesta electrónica que permiten a los estudiantes responder usando transmisores (también llamados “remotos” o “clikers”). La mayor ventaja de los sistemas de respuesta electrónica sobre métodos no técnicos de consulta, son el anonimato de las respuestas y la habilidad de proyectar inmediatamente un gráfico de respuestas para que la clase lo pueda ver. Los sistemas de respuesta electrónica también pueden almacenar las respuestas para futuros análisis y mejoras”

La citada autora menciona que estos sistemas se compones de tres partes fundamentales 1º la presentación y emisión de preguntas, 2º respuesta de los estudiantes y presentación de los resultados y finalmente 3º el manejo de datos y análisis. Un esquema de estas tres categorías de actividades se resume en la figura 1.

En primera instancia el profesor ofrece una pregunta, luego los estudiantes responden de forma anónima, y el resultado es mostrado en una diapositiva en este punto el profesor puede continuar con la clase o preguntarles a los estudiantes una posible repuesta que responderán en pequeños grupos. Finalmente los datos son analizados para futuras mejoras.

2.2.3 Sistemas de comunicación electrónicos.

Tomasi define comunicaciones electrónicas en una forma simple como la transmisión, recepción y procesamiento de la información usando circuitos electrónicos. Esta puede ser analógica o digital.

Con respecto a la historia de las telecomunicaciones Stevens ofrece un breve resumen que muestra el desarrollo de esta rama del conocimiento.

La base matemática sobre la que desarrollan las telecomunicaciones fue desarrollada por el físico ingles James Clerk Maxwell. Maxwell (1873) declaró que su principal tarea consistía en justificar matemáticamente conceptos físicos descritos hasta ese momento de forma únicamente cualitativa, como las leyes de la inducción electromagnética y de los campos de fuerza, introdujo el concepto de onda electromagnética, que permite una descripción matemática adecuada de la interacción entre electricidad y magnetismo mediante sus célebres ecuaciones que describen y cuantifican los campos de fuerzas

![](./Sdiapea%20(1)_images/image-005.png)Figura 1: Componentes tecnicos e interacción de un clasroom response sistem

Maxwell predijo que era posible propagar ondas por el espacio libre utilizando descargas eléctricas, hecho que corroboró Heinrich Hertz en 1887, ocho años después de la muerte de Maxwell, y que posteriormente supuso el inicio de la era de la comunicación rápida a distancia. Hertz desarrolló el primer transmisor de radio generando radiofrecuencias entre 31 MHz y 1.25 GHZ.

El término telecomunicación fue definido por primera vez en la reunión conjunta de la XIII Conferencia de la UTI (Unión Telegráfica Internacional) y la III de la URI (Unión Radiotelegráfica Internacional) que se inició en Madrid el día 3 de septiembre de 1932. La definición entonces aprobada del término fue:  
Telecomunicación es toda transmisión, emisión o recepción, de signos, señales, escritos, imágenes, sonidos o informaciones de cualquier naturaleza por hilo, radioelectricidad, medios ópticos u otros sistemas electromagnéticos.

El día 9 de diciembre de 1932, en virtud de los acuerdos alcanzados en la reunión antes citada, se firmó en Madrid el Convenio por el que se creaba la Unión Internacional de Telecomunicaciones (UIT) que en el futuro sustituiría a los dos organismos anteriores (UTI y URI).

El siguiente artefacto revolucionario en las telecomunicaciones fue el módem que hizo posible la transmisión de datos entre computadores y otros dispositivos. En la década de los sesenta comienza la unión entre la telecomunicación y la informática con el uso de satélites de comunicación y las redes de conmutación de paquetes.

Los setenta se caracterizaron por la aparición de las redes de computadoras y los protocolos y arquitecturas que servirían de base para las telecomunicaciones modernas (en estos años aparece la ARPANET, que dio origen a la internet). En estos años comienza el auge de la normalización de las telecomunicaciones: el CCITT trabaja en la normalización de las redes de conmutación de circuitos y de conmutación de paquetes y la Organización Internacional para la Estandarización crea el modelo OSI. A finales de los años setenta aparecen las redes de área local.

2.2.3.1 Modelo OSI

“El Modelo de Referencia de Interconexión de Sistemas Abiertos, conocido mundialmente como Modelo OSI (*Open System Interconnection*), fue creado por la ISO (*Organizacion Estándar Internacional*) y en él pueden modelarse o referenciarse diversos dispositivos que reglamenta la ITU (Unión de Telecomunicación Internacional), con el fin de poner orden entre todos los sistemas y componentes requeridos en la transmisión de datos, además de simplificar la interrelación entre fabricantes. Así, todo dispositivo de cómputo y telecomunicaciones podrá ser referenciado al modelo y por ende concebido como parte de un sistema interdependiente con características muy precisas en cada nivel.

Esta idea da la pauta para comprender que el modelo OSI existe potencialmente en todo sistema de cómputo y telecomunicaciones, pero que solo cobra importancia al momento de concebir o llevar a cabo la transmisión de datos.

El Modelo OSI cuenta con 7 capas o niveles: Nivel de Aplicación, Nivel de Presentación, Nivel de Sesión, Nivel de Transporte, Nivel de Red, Nivel de Enlace de Datos Nivel Físico

En los años ochenta los Ordenador personal se volvieron populares, con la estandarización del modelo *Osi* aparecen las redes digitales y las redes de telecomunicaciones comienzan a hacerse omnipresentes.

En la última década del siglo XX aparece la Internet, que se expandió enormemente y a principios del siglo XXI estamos viviendo los comienzos de la interconexión total, a través de todo tipo de dispositivos que son cada vez más rápidos, más compactos y más poderosos.

2.2.3.1 Estándares de Comunicación

En un mundo que tiende a la globalización, se hace necesaria la imposición de ciertos estándares, Martínez (1999) nos comenta al respecto “Un estándar, tal como lo define la ISO "son acuerdos documentados que contienen especificaciones técnicas u otros criterios precisos para ser usados consistentemente como reglas, guías o definiciones de características para asegurar que los materiales, productos, procesos y servicios cumplan con su propósito". Por lo tanto un estándar de telecomunicaciones "es un conjunto de normas y recomendaciones técnicas que regulan la transmisión en los sistemas de comunicaciones". Queda bien claro que los estándares deberán estar documentados, es decir escritos en papel, con objeto que sean difundidos y captados de igual manera por las entidades o personas que los vayan a utilizar.”

![](./Sdiapea%20(1)_images/image-006.png)Figura 2: Modelo OSI

Con respecto a los tipos de estándares Martínez continúa diciendo que “Existen tres tipos de estándares: de facto, de jure y los propietarios. Los estándares de facto son aquellos que tienen una alta penetración y aceptación en el mercado, pero aún no son oficiales. Un estándar de jure u oficial, en cambio, es definido por grupos u organizaciones oficiales tales como la ITU, ISO, ANSI, entre otras.

La principal diferencia en cómo se generan los estándares de jure y facto, es que los estándares de jure son promulgados por grupos de gente de diferentes áreas del conocimiento que contribuyen con ideas, recursos y otros elementos para ayudar en el desarrollo y definición de un estándar específico. En cambio los estándares de facto son promulgados por comités "guiados" de una entidad o compañía que quiere sacar al mercado un producto o servicio; sí tiene éxito es muy probable que una Organización Oficial lo adopte y se convierta en un estándar de jure.

Por otra parte, también existen los "estándares" propietarios que son propiedad absoluta de una corporación u entidad y su uso todavía no logra una alta penetración en el mercado. Cabe aclarar que existen muchas compañías que trabajan con este esquema sólo para ganar clientes y de alguna manera "atarlos" a los productos que fabrica. Si un estándar propietario tiene éxito, al lograr más penetración en el mercado, puede convertirse en un estándar de facto e inclusive convertirse en un estándar de jure al ser adoptado por un organismo oficial.

Un ejemplo clásico del éxito de un estándar propietario es el conector RS-232, concebido en los años 60's por la EIA (Electronics Industries Association) en Estados Unidos. La amplia utilización de la interfase EIA-232 dio como resultado su adopción por la ITU, quién describió las características eléctricas y funcionales de la interfase en las recomendaciones V.28 y V.24 respectivamente. Por otra parte las características mecánicas se describen en la recomendación 2110 de la ISO, conocido comúnmente como ISO 2110”

2.2.3.3 Descripción del estándar de comunicaciones de área personal “ZIGBEE”

La Alianza ZigBee es un consorcio no lucrativo de más de 70 compañías, incluyendo Invensys, Mitsubishi Electric, y Motorola. Estas compañías trabajan juntas para crear un estándar inalámbrico de bajo costo y de bajo consumo de energía.

Las redes ZigBee comenzaron a ser concebidas por el año 1998, cuando muchos ingenieros al crear WiFi y Bluetooth vieron que estos dos estándares iban a ser inadecuados para muchos usos. En particular, el afán de la Alianza Zigbee fue diseñar redes ad hoc de auto organización para radios digitales y además, desarrollar perfiles de uso, programas de certificación, insignias y estrategias de comercialización. El enfoque principal fue desarrollar dispositivos para aplicaciones diferentes, las cuales proveerán al usuario soluciones inalámbricas que son rentables, fáciles de utilizar, altamente confiables y seguras.

El estándar IEEE 802.15.4, en el que se basa ZigBee, fue terminado en mayo de 2003, pero para ese verano, Philips, el promotor más importante, cesó su inversión. Sin embargo, el impulso en las investigaciones sigue y Philips pasó a ser un miembro promotor de la Junta Directiva de la Alianza ZigBee. Sus especificaciones fueron ratificadas el 14 de diciembre de 2004 por la IEEE, pero el 13 de Junio de 2005 se hicieron públicas y disponibles las especificaciones ZigBee para universidades y centros de desarrollo.

2.2.3.3.1 Alianza de promotores ZIGBEE

La Alianza ZigBee tiene dos clases de socios. Los promotores son los jefes de la alianza que representan un cruce de proveedores de semiconductores, de software y de sistemas de la industria, como es el caso de FreescaleTM un promotor subsidiario de MotorolaTM.

![](./Sdiapea%20(1)_images/image-007.png)Figura 3: Promotores de la Alianza ZigBee

2.2.3.3.2 Estandar ZIGBEE

El término ZigBee describe un protocolo inalámbrico normalizado para la conexión de una Red de Área Personal Inalámbrico o WPAN. ZigBee es diferente de los otros estándares inalámbricos, ha sido diseñado para soportar un diverso mercado de aplicaciones con una conectividad más sofisticada que los anteriores sistemas inalámbricos. El estándar enfoca un segmento del mercado no atendido por los estándares existentes, con baja tasa de transmisión de datos, bajo ciclo de servicio de conectividad y bajo costo.

La razón de promover un nuevo estándar, es para permitir la interoperabilidad entre dispositivos fabricados por compañías diferentes. ZigBee es un estándar donde el estándar IEEE 802.15.4 solo contempla las capas PHY (Physical Layer) y MAC (Médium Access Control); las capa NWK (Network Layer) y APS (Application Layer) han sido establecidas por la Alianza ZigBee.

2.2.3.3.2.1 Elementos de una red Zigbee

Una red Zigbee la forman básicamente 3 tipos de elementos. Un único dispositivo Coordinador, dispositivos Routers y dispositivos finales (end points).

2.2.3.3.2.1.1El Coordinador.

Es el nodo de la red que tiene la única función de formar una red. Es el responsable de establecer el canal de comunicaciones y del PAN ID (identificador de red) para toda la red. Una vez establecidos estos parámetros, el Coordinador puede formar una red, permitiendo unirse a él a dispositivos Routers y End Points. Una vez formada la red, el Coordinador hace las funciones de Router, esto es, participar en el enrutado de paquetes y ser origen y/o destinatario de información.

2.2.3.3.2.1.2 Los Routers.

Es un nodo que crea y mantiene información sobre la red para determinar la mejor ruta para transmitir un paquete de información. Lógicamente un router debe unirse a una red Zigbee antes de poder actuar como Router retransmitiendo paquetes de otros routers o de End points.

2.2.3.3.2.1.3 End Device.

Los dispositivos finales no tienen capacidad de enrutar paquetes. Deben interactuar siempre a través de su nodo padre, ya sea este un Coordinador o un Router, es decir, no puede enviar información directamente a otro end device. Normalmente estos equipos van alimentados a baterías. El consumo es menor al no tener que realizar funciones de enrutamiento

2.2.3.3.2.2 Aplicaciones

Cada módulo Zigbee, al igual que ocurre con las direcciones MAC de los dispositivos ethernet, tiene una dirección única. En el caso de los módulos Zigbee cada uno de ellos tiene una dirección única de 64bits que viene grabada de fábrica. Por otro lado, la red Zigbee, utiliza para sus algoritmos de ruteo direcciones de 16 bits. Cada vez que un dispositivo se asocia a una red Zigbee, el Coordinador al cual se asocia le asigna una dirección única en toda la red de 16bits. Por eso el número máximo teórico de elementos que puede haber en una red Zigbee es de 2^16 = 65535, que es el número máximo de direcciones de red que se pueden asignar.

2.2.3.3.2.3 Circuito básico para el Xbee.

La figura 5 muestra las conexiones mínimas que necesita el módulo Xbee para poder ser utilizado. Luego de esto, se debe configurar según el modo de operación adecuado para la aplicación requerida por el usuario.

![](./Sdiapea%20(1)_images/image-008.png)Figura 4: Conexiones mínimas requeridas para el Xbee

El módulo requiere una alimentación desde 2.8 a 3.4 V, la conexión a tierra y las líneas de transmisión de datos por medio del UART (TXD y RXD) para comunicarse con un microcontrolador, o directamente a un puerto serial utilizando algún conversor adecuado para los niveles de voltaje.

Sin embargo siendo el módulo mucho mas que un simple transmisor cuenta a su vez con una serie de pines que cuentan como pines de entrada, salida, control y alimentación. Se describen en el cuadro a continuación cada una de las funciones de los pines asociados al módulo Xbee pro Znet 2,5

![](./Sdiapea%20(1)_images/image-009.png)Tabla 1: Pin Assignments for the XBee PRO ZNet 2.5 Modules

Las características eléctricas del dispositivo son las siguientes

![](./Sdiapea%20(1)_images/image-010.png)Tabla 2: Caracteristicas electricas del Módulo Xbee

El módulo Xbee pro Znet 2,5 Puede trabajar en los siguientes modos:

Modo de inactividad.

La modalidad de transmisión.

Modo de recepción.

Modo comando

Modo dormir

Con respecto a la forma de transmitir el módulo puede hacerlo de forma transparente, funcionando como un cable como una alternativa a la transmisión transparente existe la transmisión Api. La cual envia los datos encapsulados en paquetes, manejando metodos de control, etc.

En el modo api la estructura de la trama es la siguiente.

![](./Sdiapea%20(1)_images/image-011.png)Tabla 3: Estructura de la trama enviada por el módulo

2.2.3.3.3 Objetivos técnicos del mercado ZIGBEE

ZigBee se ha implementado en la banda mundial de 2.4 GHz, sin necesidad de licencias, o en una de las bandas regionales de 868/915 MHz. El espectro de radio sin licencia, está designado por un acuerdo internacional y pone la carga de adhesión de la especificación sobre el fabricante del equipo. La banda de 2.4 GHz es la preferida porque es una banda libre de licencias, y porque su uso es a nivel internacional. Hay muchas bandas sin licencia en las frecuencias más altas y más bajas. Las bandas de 2.4 GHz y 868/915 MHz fueron escogidas por el estándar IEEE 802.15.4 debido a sus características de propagación.

Las frecuencias 868/915 MHz y 2.4 GHz tienen buena penetración tanto a través de paredes como de techos, pero tienen un rango limitado. La limitación de rango es realmente deseable para reducir las interferencias. Volviendo a las características deseables de sistemas basados en ZigBee, la instalación debe ser automática o semiautomática, con el propósito de que los consumidores puedan

instalar redes inalámbricas fácilmente. Además, añadir nuevo hardware a un sistema existente debe ser sencillo. Debido a que ZigBee reemplaza cables y otros sistemas inalámbricos, el costo debe ser bajo para hacer el cambio a ZigBee más ventajoso.

El estándar ZigBee debe permitir una transferencia de datos de 250 Kbps y de 20 Kbps. Esto representa la cantidad de datos que puede ser transferida cuando la cabecera de la trama de datos se ha retirado. El hardware ZigBee debe poder comunicarse sobre un rango entre 10 a 75 metros. Un hardware típico a 2.4 GHz presenta una distancia de trabajo hasta 30 metros dentro de un edificio y más de 100 metros en campo abierto.

Se pueden poner hasta 216 dispositivos de ZigBee y todavía funcionar. Los dispositivos finales de la red pueden funcionar hasta 2 años con baterías del tipo AA y AAA. Los dispositivos finales pueden ser sensores inalámbricos, monitores o controladores.

2.2.5 TECLADO Y PULSADORES

Palazzesi dice “Un **botón** o **pulsador** es un dispositivo utilizado para activar alguna función. Los botones son de diversa forma y tamaño y se encuentran en todo tipo de dispositivos, aunque principalmente en aparatos eléctricos o electrónicos. Los botones son por lo general activados al ser pulsados, normalmente con un dedo. Un pulsador permite el paso o interrupción de la corriente mientras es accionado. Cuando ya no se actúa sobre él vuelve a su posición de reposo.

El contacto puede ser de dos tipos: **normalmente cerrado** en reposo (**NC**), o con el contacto **normalmente abierto** (**NA**).

Mecánicamente hablando, consta de una lámina conductora que establece contacto con los dos terminales al oprimir el botón y un muelle que hace recobrar a la lámina su posición primitiva al cesar la presión sobre el botón pulsador.”

Otros modelos de pulsadores:

![](./Sdiapea%20(1)_images/image-012.png)Figura 5: Modelos de pulsadores

La página de microchip además habla sobre los pulsadores de tacto o mTouch ™ Sensing Solutions Centro de Diseño.

Toque de detección se ha convertido en una alternativa a los tradicionales interruptor pulsador de interfaces de usuario, ya que no requiere ningún movimiento mecánico, y permite de aspecto moderno diseño. Ampliar el mercado de consumo, el tacto de detección se está afianzando en aplicaciones médicas, industriales y de automoción por motivos tales como la estética, la flexibilidad, el mantenimiento, el costo y la limpieza.

2.2.5.1 Pulsadores de tacto

Microchip ofrece una amplia variedad de soluciones para las llaves y deslizante así como la pantalla táctil . Estos son fáciles de aplicar, de baja potencia y está disponible en paquetes pequeños.” Y hace la siguiente explicación de su funcionamiento.

“Principios básicos: Cuando un usuario pulsa el panel frontal, se desvía ligeramente. Este desvío, del orden de micras, es inductiva detectado. El principio fundamental de la operación es que la impedancia de una bobina varía cuando el material de un cercano magnéticamente permeables o conducen la electricidad se mueve respecto a la bobina.

Así que un poco de presión es necesaria para activar la clave de activación aunque reduciendo dramáticamente contacto accidental.

![](./Sdiapea%20(1)_images/image-013.png)Figura 6: sensor de tacto inductivo

2.2.6 Entornos de desarrollo (ide)

Con respecto a los entornos de desarrollo o Ides Jiménez comenta “Es una aplicación de software que provee a un programador características y funcionalidad que lo ayudan a desarrollar software. Un IDE consta típicamente de un editor de texto, un compilador y/o intérprete, herramientas de auto-compilado, y un depurador. En algunas ocasiones también se ofrece un sistema de control de versiones y herramientas para simplificar la elaboración de interfaces gráficas de usuario. Los IDE actuales también tienden a integrar un explorador de clases, un inspector de objetos y un diagrama de jerarquía, para ser utilizados en desarrollo de software orientado a objetos.

Lo que un IDE busca es maximizar la productividad de un programador al suministrar componentes fuertemente integrados y relacionados con interfaces de usuario similares.

Los IDE son casi siempre creados para soportar un único lenguaje de programación aunque . Algunos ejemplos de IDEs incluyen Microsoft Visual C++, Eclipse CDT, Code::Blocks, KDevelop, Anjuta, XCode y C++ Builder.

**2.2.7 Python**

En la pagina oficial de Python se puede leer: “Python es un lenguaje de programación que permite trabajar mas rapidamente e integrar tus sistemas mas efectivamente. Puedes aprender a usar Python y mirar como inmediatamente como ganas productividad y disminuyes costos de mantenimiento.

Python corre en Windows, Linux/Unix, Mac OS X, y ha sido trasladado a las maquinas virtuales java y .NET.

Python es libre de usar, incluso para productos comerciales.”

CAPITULO III

MARCO METODOLÓGICO

En el siguiente capítulo se pasa a desarrollar puntos referentes al método a utilizar para el desarrollo de esta investigación. Se define el tipo de estudio que se presenta, desglosándolo en los siguientes tópicos; diseño de la investigación, tipo de investigación, unidad de análisis, técnicas e instrumentos de recolección de datos y los procedimientos que se seguirán para desarrollar los objetivos planteados.

3.1 Tipo de estudio.

Atendiendo a la necesidad del diseño de un sistema de apoyo al proceso de enseñanza aprendizaje, se emplea un tipo de estudio experimental, como una propuesta de proyecto factible.

3.2 Diseño de la investigación

Esta investigación es de tipo experimental, esto se expresa en concordancia a como lo sostiene Hernández Sampieri (2006:160) quien dice que “es un estudio en el que se manipulan intencionalmente una o mas variables independientes para analizar las consecuencias que la manipulación tiene sobre una o mas variables dependientes dentro de una situación de control para el investigador”, en este estudio se toma las respuestas de los individuos ante determinadas pregunta y se manipula esta información, reuniéndola hasta lograr la estadística general de la respuesta de la audiencia.

En este sentido la presente investigación pretende experimentar con la captación, transmisión, procesamiento y presentación de las respuestas de los estudiantes que intervienen en el proceso de enseñanza aprendizaje.

3.3 Tipo de investigación

Se presenta la elaboración de un proyecto factible que contienen una propuesta para dar un aporte al desarrollo tecnológico de un sistema digital interactivo de apoyo al proceso de enseñanza aprendizaje

El proyecto factible consiste en la investigación, elaboración y desarrollo de una propuesta de un modelo operativo viable para solucionar problemas, requerimientos o necesidades de organizaciones o grupos sociales; puede referirse a la formulación de políticas, programas, tecnologías, métodos o procesos. El proyecto debe tener apoyo en una investigación de tipo documental, de campo o en un diseño que incluya ambas modalidades.

Debe señalarse que esta investigación plantea un diseño adecuado a las necesidades de interacción entre el profesor y el estudiante enmarcados dentro del proceso de enseñanza aprendizaje, apoyándose en la investigación documental presentada, que muestra el uso de estos sistemas en otras partes del mundo. Formula una tecnología que podría usarse en la implementación de un sistema de respuesta en el aula de clases por tanto se concluye que este tipo de investigación es un proyecto factible.

3.4 Unidad de análisis

La unidad de análisis a utilizar está dada, por aquellos dispositivos físicos y desarrollos lógicos que intervienen en el proceso de transmisión, recolección y presentación de las respuestas provistas por los estudiantes, durante el acto de enseñanza aprendizaje. Además es necesario analizar la transparencia del sistema, esto significa que no se pierdan datos en el proceso.

3.5 Técnicas e Instrumentos de Recolección de Datos

Para recolectar los datos acerca de los dispositivos mas adecuados a utilizar en el montaje del sistema, se procedió a una revisión documental de las hojas dadas por los diversos fabricantes, con las cuales se obtenían las diversas características eléctricas, físicas, y lógicas.

Durante el proceso de montaje se hace necesario, analizar si la entrada es concordante con la salida, para esto se hace una observación de los resultados emitidos y se cotejan con la representación estadística.

3.6 El Análisis Estadísticos de los Datos

El procedimiento de datos, cualquiera que sea la técnica empleada para ello, no es otra cosa que el registro de los datos obtenidos por los instrumentos empleados, mediante una técnica analítica en la cual se comprueban las hipótesis y se obtienen las conclusiones. Permitiendo conocer los datos en términos estadísticos, los cuales representan la magnitud de las variables. En el análisis e interpretación de los datos se utilizaron las técnicas de análisis cualitativo, porque facilitaron la clasificación y análisis de la información a obtener, en el desarrollo de la investigación. En la técnica cualitativa se realizará la aplicación de las normas y procedimientos; así como también el análisis del proceso de observación directa, la cual se observará en el área de trabajo para obtener toda la información de la investigación.

3.7 Procedimientos

El procedimiento que se siguió para la realización de esta investigación se presenta a continuación:

-   Recolección de datos e información acerca de temas de interés. Seleccionados en diferentes medio de información.
-   Definición y formulación del problema considerando los beneficios académicos, económicos y tecnológicos.
-   Formulación de los objetivos generales y específicos de la investigación. El objetivo general es el fin último de la investigación, los objetivos específicos consisten en establecer los pasos o fines parciales que deben cumplirse para lograr el objetivo general, el cual debe estar en concordancia con los requeridos en la formulación del problema.
-   Diseñar un esquema general del sistema completo
-   Realizar cada bloque del sistema por separado
-   Se comenzó con los botones de tacto, tratando de llevar los niveles lógicos entre 0-3v
-   Se descargó el software de diseño de esquemas electrónicos y pcb para linux Kicad;
-   Se realizó la comunicación entre los dispositivos.
-   Se configuró la red de acuerdo al sistema
-   Se realizó la interfaz gráfica docente-sistema.
-   Se realizaron las pruebas pertinentes

CAPITULO IV

DISEÑO Y RESULTADOS

4.1 Diseño del proyecto.

4.1.1 Descripción del proyecto.

El sistema de apoyo al proceso de enseñanza aprendizaje está basado en comunicar la respuesta de los estudiantes ante preguntas colocadas en el pizarrón por medio de una interfaz de botones en el pupitre, que enviara la respuesta inalámbrica a un microprocesador que realizara un conteo de las respuestas, enviando la estadística de las respuestas al PC, donde una interfaz las mostrara en la pantalla del computador que luego se proyectara al pizarrón.

![](./Sdiapea%20(1)_images/image-014.png)Figura 7: Visión global del sistema

El sistema esta enfocado, dentro del proceso educativo como elemento del sistema de apoyo, dando medios o caminos de comunicación mas efectivos para agilizar el proceso educativo; que es esencialmente un proceso comunicativo.

Este sistema trabaja orientado a la parte del procedimiento que consiste en evaluar el estatus del aprendizaje, se intercala en el momento de hacer mediciones de los resultados, que deben posteriormente ser evaluados por el profesor para completar el procedimiento evaluativo. También es utilizado durante el desarrollo de la clase ofreciendo una realimentación precisa, sobre lo que esta sucediendo en el proceso de aprendizaje, esto servirá de indicador para corregir el curso del proceso de enseñanza.

Ahora se analizará por separado cada una de las partes constitutivas del sistema, empezando por la interfaz estudiante-sistema, que es el dispositivo presente en el pupitre, llamados en la figura como dispositivos finales. Posteriormente se detallara el comportamiento de el nodo coordinador, o lo que se podría llamar la interfaz red-computador, luego se analiza el software de manejo de datos que estará en el computador y la interfaz gráfica, que es finalmente la interfaz sistema-docente

4.1.1.1 Dispositivos finales.

Estando en cada pupitre los dispositivos finales cuentan con tres partes constitutivas básicas. Los botones que para efectos del diseño se han colocado 6, el circuito digital, y el transceiver. Se esquematizan en la siguiente figura.

![](./Sdiapea%20(1)_images/image-015.png)Figura 8: Esquema modular de circuito en el pupitre

4.1.1.1.1 Sensores de tacto.

Los botones utilizados necesitan ser sometidos a constante uso por parte de los estudiantes, por lo que entra en juego el problema de la durabilidad de esta interfaz, alumno-dispositivo final, analizando las distintas soluciones se opta por un botón sensible al tacto, cuyo rendimiento no se vera afectado por el uso; a este respecto en la revista saber electrónica, Rodríguez explica “sucede que el cuerpo humano esta sometido a campos eléctricos y magnéticos en todo momento” utilizando esta característica y con un arreglo de resistencias y transistor es posible realizar un sensor sensible al tacto.

![](./Sdiapea%20(1)_images/image-016.png)Figura 9: Sensor de tacto

El circuito propuesto funciona de la siguiente manera: un sensor de tacto se coloca en la base de un transistor, este sensor bien puede ser una placa metálica o un elemento metálico cualquiera (tuercas, tornillos, etc.) cuando el sensor no está siendo tocado, el transistor esta en corte con lo que el voltaje en la base del transistor es muy bajo actuando como un cero lógico; cuando se coloca el dedo en la base del transistor la corriente producida por el ruido coloca al transistor en zona activa lo que permite la conducción en la resistencia, de esta manera una corriente cae sobre la resistencia de 47k, formando de esta manera un voltaje de aprox de 1,00-1,50 esto se lleva a un *opamp* *224* con el pin inversor en un valor de voltaje de 0,7 voltios. Al comparar los voltajes la salida del opamp se ira al voltaje de alimentación de 5voltios de un uno lógico. De esta forma obtenemos un circuito al tacto que da valores entre 0 y 5 voltios.

4.1.1.1.2 Circuito Lógico.

Las características de estos dispositivos en el pupitre plantean que el estudiante al tocar el sensor de tacto tenga una realimentación de que realmente pulso el botón, para esto se piensa la utilización de un led de baja potencia, ademas si el estudiante duda sobre la respuesta, o decide finalmente que la opción debe ser otra, debe tener la posibilidad de cambiar de respuesta.

Por las características del diseño es necesario que al pulsar el sensor el estado se mantenga, es decir que la tecla se mantenga pulsada después que el “botón” ha sido tocado, es por esto que se debe usar un dispositivo de memoria, se empleo para tal fin un *latch rs*, en vista de la dificultad de conseguir dicho dispositivo como un circuito integrado completo , se procedió a fabricarlo con dos compuertas nor, además es necesario que solo una opción sea pulsada, por tanto la entrada reset del latch está conectada a la salida de una compuerta nand de tres entradas cuyas entradas estarán conectadas a la salida de los sensores de las otras tres opciones.

![](./Sdiapea%20(1)_images/image-017.png)Figura 10: Latch Rs

![](./Sdiapea%20(1)_images/image-018.png)Figura 11: Control de los botones

Esta parte del circuito pudo realizarse con el uso de un microcontrolador como pudo haber sido el pic16f877, esta opción también se estudió e incluso se realizó un programa base para los botones, disponible en el anexo 1.

Tal programa seria totalmente efectivo; enviaría los datos por vía serial y atendería las interrupciones por transmisión serial, sin embargo en busca del modelo mas optimo, y en vista de la producción en masa, se busca un modelo que sea lo mas económico posible; aprovechando al máximo las capacidades del módulo transceiver.

4.1.1.1.3 Transceiver Xbee.

El módulo transceiver Xbee, puede configurarse de manera que actúe como tres tipos de dispositivos distintos, bien sea como coordinador, router, o end device. El módulo que va conectado en el pupitre, se configura como end device o dispositivo final, de esta manera debe interactuar siempre a través de su nodo padre, ya sea este un Coordinador o un Router, es decir, no puede enviar información directamente a otro end device, ni realizar funciones de enrutamiento.

![](./Sdiapea%20(1)_images/image-019.png)Figura 12: Descripción de los pines

Los módulos son en si un microcontrolador, tienen diversos pines que pueden trabajar como puertos de entrada/salida y como conversores analógicos, también tienen una salida de pwm y otros pines de control. Es necesario colocarle una configuración adecuada, para esto el módulo se le instala una versión de firmeware especifica que lo configure dentro de una red como end device.

Para instalar la versión de firmeware o programa que actuara como manejador, se utiliza la aplicación x-ctu provista por digi.com, tal software trabaja unicamente sobre plataforma windows y bajo los siguientes sistemas operativos Windows 98, 2K, ME, XP; no trabaja para Window 95, NT; Unix; Linux.

![](./Sdiapea%20(1)_images/image-020.png)Figura 13: Software X-CTU

En esta primera pantalla el software analiza los puertos seriales conectados a la computadora así como los puertos virtuales asociados a los puertos USB. Los módulos pueden conectarse a través de un circuito con max232 o a través de una tarjeta conocida como Zigbee explorer serial.

![](./Sdiapea%20(1)_images/image-021.png)Figura 14: Placa Zigbee explorer serial

Luego de seleccionar el puerto al cual esta conectado el módulo, se pulsa la pestaña modem configuration; allí es posible configurar al módulo con ciertos parámetros.

Lo primero es el firmeware a utilizar:

![](./Sdiapea%20(1)_images/image-022.png)Figura 15: Configurando el módulo con X-CTU

El ovalo rojo esta indicando el sitio desde donde se desplegaran una serie de opciones de firmeware; para los efectos de este diseño se toma la opción de Znet 2.5 router/end device Api y luego se presiona en el ovalo azul *write.*

A continuación en el recuadro inferior aparecen desplegados una serie de archivos, que salen de carpetas, algunos en color verde y otros en color negro; los parámetros en color negro son fijos de fábrica y no son modificables, los que están en color verde son configurables al hacer click sobre ellos. Tales archivos se utilizan para configurar el comportamiento del módulo y los pines en muy diversas maneras.

Para el desarrollo de esta investigación los dispositivos en el pupitre serán esclavos del nodo coordinador, por tanto los parámetros de red y seguridad estarán orientados de la siguiente manera: el *ID PAN ID* debe ser el mismo para cada transceiver pues pertenecen a la misma red. En la dirección de destino debe escribirse la dirección del dispositivo coordinador, para obtener la dirección del coordinador debe introducirse este en el explorer xbee serial y dar a *read* y anotar su dirección.

Luego se configuran los pines de entrada y salida. Que tienen diversas formas de trabajar. Se usara el *Dio0, Dio1, Dio2, Dio3,Dio4, Dio6* como entradas digitales y el pin *Dio8* se usara como el pin sleep\_rq este pin funciona de la siguiente manera: cuando el pin esta a un valor de 3.3 v el módulo esta dormido, cuando pasa a 0 voltios el módulo despierta. Uno de los pines el *Dio7* es colocado como salida digital y permitirá el control sobre los sensores y los leds. Esto es con el motivo de que los dispositivos no enciendan los leds sino en el momento de la pregunta, pues esto podría distraer al estudiante del proceso de aprendizaje.

Con el objeto de que el módulo envié información del estado de los sensores, es necesario configurar al módulo de cierta forma específica; a continuación se presentan diversas maneras en el que el módulo puede enviar información del estado de sus pines.

4.1.1.1.3.1 Monitoreo de las lineas de entrada-salida

Los módulos XBee ZNet 2.5 soportan entradas y salidas analógicas y digitales, las I/o analógicas y digitales pueden ser leídas o escritas. Cuando un módulo toma una muestra de los pines I/O, los empaqueta y los envía en una trama constituida de la siguiente manera

![](./Sdiapea%20(1)_images/image-023.png)Tabla 4: Formato de la trama de datos

4.1.1.1.3.1.1 Muestreo requerido.

El comando IS puede ser enviado a un dispositivo remoto a través de una trama (siempre que este en modo api) cuando el comando IS es enviado el dispositivo receptor muestrea todas las IO digitales y analógicas y devuelve una muestra empaquetada y enviada al dispositivo que solicito la muestra

4.1.1.1.3.1.2 Muestreo de IO periodicamente.

Un muestreo periódico lleva al módulo a tomar una muestra IO y transmitirla a un dispositivo remoto con una taza periódica. El tiempo periódico de envío es configurado por el comando IR. Si el comando IR es colocado a cero, el muestreo periódico esta deshabilitado. Para otros valores de IR, la información sera muestreada tantos milisegundos como sea configurada

4.1.1.1.3.1.3 Cambio en el nivel digital.

Los módulos pueden ser configurados para transmitir una muestra inmediatamente cuando cualquier pin de las entradas digitales cambia de estado. El comando IC es una mascara de bit que puede ser usada para configurar cuales lineas digitales serán monitoreadas para un cambio de estado.

Para el desarrollo de este diseño la opción de conocer el estado de los bits, se encontró que la forma mas adecuada fue colocar los pines *Dio0, Dio1, Dio2, Dio3,Dio4, Dio6, Dio7.* En cambio de nivel digital; para lograrlo dentro del software *X-ctu,* en la pestaña *modem configuration*, se busca dentro de la carpeta *IO sampling* , la configuración *IO Change Deteccion,* al hacer click se escribe el número 5F hexadecimal que en binario sería; 0101 1111 lo que indica cuales bits de entrada salida serán monitoreados para un cambio de detección, en este caso todos aquellos que previamente habíamos configurado como entradas.

4.1.1.2 Coordinador:

El Bloque coordinador esta compuesto por un módulo Xbee que se puede conectar al computador por puerto serie, o por puerto usb, se conecto por puerto usb a través de una placa usb explorer. Para configurarlo, es necesario actualizarlo con un firmeware de *Znet 2.5 coordinador api*, y se configura con los parametros *ID PAN ID, Chanel* iguales que el end device.. el dispositivo gestionara todo lo relacionado con la transmisión inalámbrica, manejando sus llamadas, sus esperas, sus códigos de seguridad, su encriptamiento y las labores que utiliza para evitar colisiones y dejara pasar al computador los datos enviados por cada nodo.

4.1.1.3 Computador personal

En el computador se desarrollo un software en el lenguaje de programación phyton, el cual se comunica con el puerto al cual está conectado el coordinador, de allí recibe tramas desde los distintos dispositivos; tales tramas vendrán dadas con el cambio en los pines del módulo, es decir con la votación del estudiante, al recibir tal dato, el software almacenara en un contador el valor de la respuesta dada, ademas enviara una señal para que modifique la salida de uno de los pines para lograr de esta manera que el módulo se apague.

| **Alumno** | **Circuito Lógico** | **Transceiver** | **Software** |
| --- | --- | --- | --- |
|  | Apagado | Dormido | Activa la Pregunta |
| Enciende el módulo | Apagado | Despierta y envía Trama | Recibe Trama y envía trama apagando el control. |
| Piensa | Encendido | Despierto o dormido | Espera |
| Vota | Encendido | Despierto y envia trama | Recibe Trama y enciende el control. |
|  | Apagado | Dormido | Presenta resultados |

Tabla 5: Comportamiento del sistema.

4.2 Plano del hardware completo.

Luego de mostrar el diseño, se prosigue a la presentación de el plano del hardware que se utilizara en el pupitre.

![](./Sdiapea%20(1)_images/image-024.png)Figura 16: Plano del hardware

4.3 Descripción de la interface en el pc.

La interfaz cuenta con un botón de *escanear* con el cual se analizan los puertos serie y puertos virtuales de los cuales dispone la computadora, de allí se selecciona el puerto en el que esta el nodo coordinador, una vez seleccionado el puerto se le da a la opción *conectar* en este instante es que se activa la votación, alli el software esperara que los estudiantes enciendan sus dispositivos. Una vez que ellos despierten al módulo, el software enviara la señal para que el pin de control sea llevado a uno.

El código consta de dos partes fundamentales; el código diseñado en pyhton y la interfaz diseñada en glade.

4.3.2 Código Glade.

El código de glade es generado a partir del programa glade que se desarrolla en Anjuta, en dicho programa, a partir de iconos se va creando la estructura de lo que sera la cartula del programa, posterior a esto se crean una seria de señales que deben ser importadas desde el código desarrollado en python.

*![image.png](./Sdiapea%20(1)_images/image-025.png)*

![](./Sdiapea%20(1)_images/image-026.png)Figura 18: Software de adquisición, procesamiento y presentación

![image.png](./Sdiapea%20(1)_images/image-027.png)

![image.png](./Sdiapea%20(1)_images/image-028.png)

![image.png](./Sdiapea%20(1)_images/image-029.png)

CONCLUSIONES

El desarrollo de esta investigación ha explorado el campo de los dispositivos de respuesta en el aula de clase, ofreciendo una revisión documental de los mismos, además ha presentado un posible diseño para su implementación en diversos centros educativos, en este sentido ha utilizado una tecnología por radiofrecuencia emergente como lo es los módulos xbee.

En este sentido esta investigación arroja las siguientes conclusiones.

-   Basados en diversos estudios se ha determinado que los dispositivos de respuesta del aula de clase aumentan la interactividad, y el interés en el proceso de enseñanza aprendizaje
-   El anonimato en las respuestas, por parte de los estudiantes se hace necesario para evitar que el instrumento ofrezca resultados negativos en la psiquis de los estudiantes
-   El sistema de respuesta en el aula de clases es un dispositivo de medición, no de evaluación, en tal sentido siendo la evaluación un proceso mas complejo, queda de parte del facilitador del aprendizaje tomar decisiones con respecto a el resultado de la medición.
-   Se presentó un modelo de aprendizaje con paralelismos a los sistemas de control realimentado, donde se ubica el sistema de respuesta del aula de clases como lazo realimentado.
-   Se presentó un modelo de sistema digital interactivo, con todas sus pares constitutivas, de manera que puede ser implementado en cualquier entorno que sea necesario.
-   Ante al perpetuo uso por parte de los estudiantes, se innovo en la utilización de sensores de tacto, de manera que el sistema presente una mayor durabilidad en el tiempo.
-   Se presentó el uso de módulos xbee en una forma específica. De manera que aun implementando en distintos salones, el coordinador es capaz de identificar los de cada salón, además debido a la gran capacidad de direccionamiento de los módulos, es posible utilizar en salones con gran cantidad de estudiantes
-   Se presentó un software realizado en phyton capaz de manejar los módulos Xbee.

RECOMENDACIONES

-   Es posible implementar pics en compañía de los módulos para aplicaciones matriciales, que incluso podrían servir de calculadoras en los pupitres
-   El software puede ser expandido para aprovechar las frames de los módulos xbee en modo api para poder identificar de donde proviene cada respuesta de manera que la evaluación pueda ser individualizada
-   La utilización de circuitos integrados tipo latch, en lugar de compuertas lógicas puede reducir el circuito lógico en los end devices.

**\-**

Anexos

Anexo 1

Programa en lenguaje ensamblador para dispositivo en el pupitre:

;----------------------------------------------------------------

; Plantilla generada por Piklab

#include <p16f877.inc>

;----------------------------------------------------------------

; Bits de configuración: adapte los parámetros a su necesidad

\_CONFIG \_RC\_OSC & \_WDT\_ON & \_PWRTE\_OFF & \_BODEN\_ON & \_LVP\_ON & \_CPD\_OFF & \_WRT\_ENABLE\_ON & \_DEBUG\_OFF & \_CP\_OFF

; -----------------------------------------------------------------

; Declaración de variables

INT\_VAR UDATA\_SHR

w\_saved RES 1 ; variable utilizada para guardar contexto

status\_saved RES 1 ; variable utilizada para guardar contexto

pclath\_saved RES 1 ; variable utilizada para guardar contexto

var1 RES 1 ; variable de ejemplo

contador1 equ 0x20 ;registros utilizados

contador2 equ 0x21 ;en la rutina de retardo

DATO equ 0x22

;----------------------------------------------------------------

; reiniciar vector

STARTUP CODE 0x000

nop ; requerido para el depurado ICD2

movlw high start ; cargar el byte superior de la ;etiqueta «start»

movwf PCLATH ; inicializar PCLATH

goto start ; ir al inicio del código principal

; vector de interrupciones

INT\_VECTOR CODE 0x004

goto interrupt ; va al código de interrupción

;/\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*

;/\*\*\*\* Rutina de Interrupciones\*\*\*\*\*

;/\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*

; código reubicable

PROG CODE

interrupt

movwf w\_saved ; guardar contexto

swapf STATUS,w

movwf status\_saved

movf PCLATH,w ; se requiere si se utiliza más de la ;primera página

movwf pclath\_saved

clrf PCLATH

INTER

btfss PIR1,RCIF ; ¿Interrupción por recepción?

goto VOLVER ; No, falsa interrupción

bcf PIR1,RCIF ; Si, reponer flag

movf RCREG,W ; Lectura del dato recibido

btfsc W,0

goto Dime

goto Activense

Activense

clrf var1

clrf PORTA

clrf PORTB

clrf DATO

goto Salir

Dime

call TX\_DATO

clrf PORTA

clrf PORTB

clrf DATO

movlw 0x01

movwf var1

bsf PORTB,4

goto Salir

Salir

movf pclath\_saved,w ; restaurar contexto

movwf PCLATH

swapf status\_saved,w

movwf STATUS

swapf w\_saved,f

swapf w\_saved,w

VOLVER

retfie

;/\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*

;/\*\*\*\*\*\*\*\*\*\*\*Sub Rutinas\*\*\*\*\*\*\*\*\*\*\*

;/\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*

;/\*\*\*\*\*\* sub rutina de transmision de datos por Usart\*\*\*\*\*\*\*\*

TX\_DATO bcf PIR1,TXIF ; Restaura el flag del ; transmisor

movf DATO,W

movwf TXREG ; Mueve el byte a transmitir al ; registro de transmision

bsf STATUS,RP0 ; Bank01

bcf STATUS,RP1

TX\_DAT\_W btfss TXSTA,TRMT ; ¿Byte transmitido?

goto TX\_DAT\_W ; No, esperar

bcf STATUS,RP0 ; Si, vuelta a Bank00

return

;/\*\*\*\*\*\*\*\*\*\*\* sub rutina de retardo de 250ms\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*

retardo

movlw 0x4E

movwf contador1

movlw 0xC4

movwf contador2

Retardo\_0

decfsz contador1, f ;decrementa registro contador1

goto $+2

decfsz contador2, f ;decrementa registro contador2

goto Retardo\_0

return

Start

;/\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*

;/\*\*\*\*\*\*\*\*\*\*\*\*\*Inicio\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*

;/\*\*\*\*\*\* Programa Principal\*\*\*\*\*\*\*\*\*\*\*

;/\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*

; CONFIGURACION DE PUERTOS

banksel TRISB

movlw 0xff

movwf TRISB

bsf OPTION\_REG,7 ;Desactiva Resistencias de pull up

movlw b'10111111'

movwf TRISC

movlw 0xD0

movwf TRISA

; CONFIGURACION DE USART

banksel TXSTA

movlw b'00100100' ; Configuración USART

movwf TXSTA ; y activación de transmisión

movlw .25 ; 9600 baudios

movwf SPBRG

bsf PIE1,RCIE ; Habilita interrupción en recepción

bcf STATUS,RP0 ; Bank00

movlw b'10010000' ; USART para recepción continua

movwf RCSTA ; Puesta en ON

movlw b'11000000' ; Habilitación de las

movwf INTCON ; interrupciones en general

movlw 0x01

movwf var1

BUCLE btfsc var1,0

goto BUCLE

Verifica

banksel PORTB

btfss PORTB,0

goto boton1

btfss PORTB,1

goto boton2

btfss PORTB,2

goto boton3

btfss PORTB,3

goto boton4

btfss PORTB,4

goto ENTER

goto Verifica

boton1

call retardo

movlw b'00000001'

movwf PORTA

goto Verifica

boton2

call retardo

movlw b'00000010'

movwf PORTA

goto Verifica

boton3

call retardo

movlw b'00000100'

movwf PORTA

goto Verifica

boton4

call retardo

movlw b'00001000'

movwf PORTA

goto Verifica

ENTER

call retardo

movf PORTA,W

movwf DATO

clrf PORTA

bsf PORTA,4

call retardo

bsf var1,0

goto BUCLE

END

Anexo 2; Flujogramas de Programa principal e interrupción

![](./Sdiapea%20(1)_images/image-030.jpeg)![](./Sdiapea%20(1)_images/image-031.jpeg)

Anexo 2

\# -\*- coding: UTF-8 -\*-

\# Importamos el módulo pygtk y le indicamos que use la versión 2

#

import sys #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

import pygtk

if not sys.platform == 'win32':

pygtk.require('2.0')

import gtk

import gtk.glade

import serial

import threading

import inspect

import gobject

import time

#import pylab as p

import matplotlib

matplotlib.use('GTK')

from matplotlib.figure import Figure

from matplotlib.axes import Subplot

from matplotlib.backends.backend\_gtkagg import FigureCanvasGTKAgg as FigureCanvas

from matplotlib.backends.backend\_gtkagg import NavigationToolbar2GTKAgg as NavigationToolbar

from matplotlib.widgets import SpanSelector

#----------------------

\# MAIN

#----------------------

class MainGui:

"GTK/Glade User interface. This is a pyGTK window"

def changed\_cb(self, widget):

self.toggle\_button.set\_sensitive(False)

model = self.combobox1.get\_model()

index = self.combobox1.get\_active()

if index:

self.Puerto=model\[index\]\[0\]

self.toggle\_button.set\_sensitive(True)

return

def conectar(self):

#Conectando

try:

self.serial =serial.Serial(self.Puerto, 9600, timeout=1)

print self.serial.portstr

self.conectado = True

self.puerto\_actual=True

except:

self.serial.close

def on\_toggle\_button(self, widget):

\# Si estamos aqui, el botón biestado está presionado

if widget.get\_active():

self.toggle\_button.set\_label("Desconectar")

\# Si estamos aqui, el botón biestado está pulsado

self.combobox1.set\_sensitive(False)

self.boton\_rescan.set\_sensitive(False)

if not self.conectado:

self.conectar()

self.manejador\_ini\_Rx = gobject.timeout\_add(200, self.ini\_Rx)

else:

\# Si estamos aqui, el botón biestado está levantado

self.toggle\_button.set\_label("Conectar")

if self.serial.isOpen():

self.serial.close()

self.conectado=False

gobject.source\_remove(self.manejador\_ini\_Rx)

self.serial.close

self.combobox1.set\_sensitive(True)

self.boton\_rescan.set\_sensitive(True)

def ini\_Rx(self):

if self.serial.inWaiting() != 0:

try:

#--Hallar el delimitador de inicio SD (start delimiter)

sd=self.serial.read(1)

if sd == '~': # ~ ==> 0x7E o 7E sd=self.serial.read(1).encode("hex")

self.procesar\_trama()

return True

except:

print('Error de lectura/Trama incompleta')

return True

else: return True

def HexToByte(self,hexStr):

bytes = \[\]

self.total=0

print hexStr

for i in hexStr:

self.total+=int(i,16)

hexStr = ''.join(hexStr)

for i in range(0, len(hexStr), 2):

bytes.append( chr( int (hexStr\[i:i+2\], 16 ) ) )

return ''.join( bytes )

def procesar\_trama(self):

#--longitud del mensaje

lengthMSB = self.serial.read(1).encode("hex")

lengthLSB = self.serial.read(1).encode("hex")

length = int(lengthMSB, 16)+int(lengthLSB, 16)

#--Se guarda lo que se conoce en el manual xbee como frame specific data ()fsd

buffer=(self.serial.read(length).encode("hex"))

#Se guarda el checksum

check\_sum=self.serial.read(1).encode("hex")

j=0

fsd=\[\]

#Se guarda resto de la trama en el buffer

for i in range(len(buffer)):

if j%2==0:

fsd.append(buffer\[i\]+buffer\[i+1\])

j=j+1

if fsd\[0\]=='92':

print 'es 92'

print fsd

if ((fsd\[14\]=='5f') and (fsd\[17\]=='5e')):

direccion=self.HexToByte(fsd\[1:9\])

print direccion

presuma=chr(int(0xff-(0x18+self.total+0x7E)&0xff))

#Se envia trama para activar

self.serial.write("\\x7E\\x00\\x10\\x17\\x01%s\\xFF\\xFE\\x02\\x44\\x37\\x04%s"%(direccion,presuma))

#---------------------------------------------------- \[D 7 Bajo\]

if ((fsd\[14\]=='5f') and (fsd\[17\]=='59')):

self.A=self.A+1

direccion=self.HexToByte(fsd\[1:9\])

print direccion

presuma=chr(int(0xff-(0x18+self.total+0x7F)&0xff))

#Se envia trama para activar

self.serial.write("\\x7E\\x00\\x10\\x17\\x01%s\\xFF\\xFE\\x02\\x44\\x37\\x05%s"%(direccion,presuma))

#---------------------------------------------------- \[D 7 Alto\]

if ((fsd\[14\]=='5f') and (fsd\[17\]=='55')):

self.B=self.B+1

direccion=self.HexToByte(fsd\[1:9\])

print direccion

presuma=chr(int(0xff-(0x18+self.total+0x7F)&0xff))

#Se envia trama para activar

self.serial.write("\\x7E\\x00\\x10\\x17\\x01%s\\xFF\\xFE\\x02\\x44\\x37\\x05%s"%(direccion,presuma))

#---------------------------------------------------- \[D 7 Alto\]

if ((fsd\[14\]=='5f') and (fsd\[17\]=='5d')):

print 'Se pulso enter solamente'

direccion=self.HexToByte(fsd\[1:9\])

print direccion

presuma=chr(int(0xff-(0x18+self.total+0x7F)&0xff))

#Se envia trama para activar

self.serial.write("\\x7E\\x00\\x10\\x17\\x01%s\\xFF\\xFE\\x02\\x44\\x37\\x05%s"%(direccion,presuma))

#---------------------------------------------------- \[D 7 Alto\]

return

def escanear\_puertos(self,widget):

self.scan()

def activar\_dispositivos(self,widget):

#self.serial.write("\\x7E\\x00\\x10\\x17\\x01%XxFF\\xFE\\x02\\x44\\x32\\x05\\x6f"%(direccion,self.checksum(fsd)))

while True:

try:

self.canvas\_1.destroy()

break

except:

print "nothing to destroy"

break

self.fig.clear()

def scan(self):

if self.puerto\_actual:

self.serial.close()

num\_puertos=15

self.combobox1.append\_text('Escoja el puerto:')

self.combobox1.set\_active(0)

for n in range(num\_puertos):

self.combobox1.remove\_text(1)

for u in range(num\_puertos):

try:

ser = serial.Serial(u)

self.combobox1.append\_text(ser.portstr)

ser.close()

except:

pass

def graf\_vacia(self):

\# setup matplotlib stuff on first notebook page (empty graph)

self.fig = Figure(figsize=(1,1), dpi=72,edgecolor='r',linewidth=2.0)

self.ax = self.fig.add\_subplot(111)

self.ax.set\_ylabel('Cantidad de votos')

group\_labels = \['A', 'B','C', 'D'\]

self.ax.set\_xticklabels(group\_labels)

self.canvas\_1 = FigureCanvas(self.fig) # a gtk.DrawingArea

self.canvas\_1.set\_size\_request(400, 200)

self.graphview = self.wTree.get\_widget("vbox2")

self.graphview.pack\_start(self.canvas\_1, True, True)

self.canvas\_1.show()

self.navToolbar = NavigationToolbar(self.canvas\_1,self.wTree.get\_widget("Principal"))

self.wTree.get\_widget("vbox2").pack\_start(self.navToolbar)

self.navToolbar.show()

def autolabel(self,rects):

\# attach some text labels

for rect in rects:

height = rect.get\_height()

self.ax.text(rect.get\_x()+rect.get\_width()/2., 1.05\*height, '%d'%int(height),

ha='center', va='bottom')

def ver\_grafica(self, widget):

print 'hola'

self.y = \[self.A, self.B, 7, 3\]

N = len(self.y)

self.ind = range(N)

self.barra=self.ax.bar(self.ind, self.y, color='rgby',align='center')

self.ax.set\_xticks(self.ind)

self.autolabel(self.barra)

self.canvas\_1.draw()

def \_\_init\_\_(self):

\# # # # #

self.A=0

self.B=0

self.C=0

self.D=0

\# # # # #

self.conectado = False

self.guardar=False

self.puerto\_actual=False

self.wTree = gtk.glade.XML("P1.glade")

signals = { "gtk\_main\_quit" : gtk.main\_quit,

"on\_toggle\_button\_released" : self.on\_toggle\_button,

"on\_boton\_activar\_released" : self.activar\_dispositivos,

"on\_boton\_rescan\_released" : self.escanear\_puertos,

"combobox1\_changed\_cb" : self.changed\_cb,

"on\_boton\_grafica\_released" : self.ver\_grafica

}

\# Luego se auto-conectan las señales.

\# Es decir se asocian las señales de la interfaz con los métodos de la aplicación.

self.wTree.signal\_autoconnect(signals)

self.wTree.signal\_autoconnect(dict(inspect.getmembers(self)))

\# Ahora obtenemos del archivo glade los widgets que vamos a utilizar

self.boton\_rescan = self.wTree.get\_widget("boton\_rescan")

self.toggle\_button = self.wTree.get\_widget("toggle\_button")#boton

self.boton\_grafica = self.wTree.get\_widget("boton\_grafica")#boton

self.DIO2 = self.wTree.get\_widget("DIO2")#Imagen

self.combobox1 = self.wTree.get\_widget("combobox1")

self.toggle\_button.set\_sensitive(False)

self.graf\_vacia()

self.scan()

if \_\_name\_\_== "\_\_main\_\_":

MainGui()

gtk.main()

BIBLIOGRAFÍA

Maryfran Barber and David Njus (2007) **Clicker Evolution: Seeking Intelligent Design** CBE Life Sciences Education Vol. 6, 1–20,

Keng Siau, Hong Sheng, Fiona Fui-Hoon Nah. (2006) **Use of a Classroom Response System to**

**Enhance Classroom Interactivity,** DigitalCommons@University of Nebraska - Lincoln. [http://digitalcommons.unl.edu/managementfacpub/26](http://digitalcommons.unl.edu/managementfacpub/26)

Roger C. Lowery (2005), **Teaching and Learning with Interactive Student Response Systems:A Comparison of Commercial Products in the Higher-Education Market** New Orleans, LA

Ashley Deal (2007) Classroom Response Systems

Carmen Hedwig Fies (2005)**CLASSROOM RESPONSE SYSTEMS: What Do They Add to An Active Learning Environment?** Austin Texas

Jeffrey T. Johnson, (2005) **Creating Learner-Centered Classrooms: Use of an Audience Response System in Pediatric Dentistry Education** Kentucky

Ian D. Beatty, William J. Gerace, William J. Leonard, and Robert J. Dufresne (2008) **Designing Effective Questions for Classroom Response System Teaching** Scientific Reasoning Research Institute & Department of Physics University of Massachusetts Amherst, MA 01003-9337 USA

Sally A. Gauci, Arianne M. Dantas, David A. Williams and Robert E. Kemm (2007) **Promoting student-centered active learning in lectures with a personal response system,** Department of Physiology, The University of Melbourne, Melbourne, Victoria, Australia

J. Roschelle (2003) **Unlocking the learning value of wireless mobile devices** Blackwell Publishing Ltd

Fernando de la Parra Gimeno, Óscar Quintanilla Artero y Julio Tórtola del Moral (2007) **Proyectos de sistemas informaticos, SISTEMA INTERACTIVO DE DOCENCIA.** Universidad complutense de Madrid

EDWIN SANTIAGO BORJA RAMÍREZ Y WÍLMER RAFAEL ANDRANGO DÍAZ (2007) **Diseño e implementación de una red inalámbrica para el sufragio electrónico basado en el estándar zigbee** (**IEE 802.15.4)**

Joyce, B. y Weil, M. (1985**) 'Modelos de enseñanza'**. Ed. Anaya. Madrid.

Gerardo Meneses Benítez (2007) NTIC, INTERACCIÓN Y APRENDIZAJE EN LA UNIVERSIDAD UNIVERSITAT ROVIRA I VIRGILI

Dr. Pere Marquès Graells, 2001 DIDÁCTICA. LOS PROCESOS DE ENSEÑANZA Y APRENDIZAJE. LA MOTIVACIÓN

César Coll La evaluación en el proceso de enseñanza/aprendizaje, cuadernos de pedagogía

Wayne Tomasi 2003 Sistemas De Comunicaciones Electrónicas Prentice Hall

Evelio Martínez Julio 1999 Estándares de Telecomunicaciones Revista RED

Acosta Ponce, María Catalina 2006 **Estudio del estándar IEEE 80.15.4 "ZIGBEE" para comunicaciones inalámbricas de área personal de bajo consumo de energía y comparación con el estándar IEEE 802.15.1 "BLUETOOTH"** [http://biee.epn.edu.ec/dspace/handle/123456789/815](http://biee.epn.edu.ec/dspace/handle/123456789/815)

Ariel Palazzesi Pulsador [http://www.ucontrol.com.ar/wiki/index.php/Pulsador](http://www.ucontrol.com.ar/wiki/index.php/Pulsador)

**Referencias electrónicas**

El modelo Osi

[http://elsitiodetelecomunicaciones.iespana.es/modelo\_osi.htm](http://elsitiodetelecomunicaciones.iespana.es/modelo_osi.htm)

[Pagina oficial de Python](http://www.python.org/)

[http://www.python.org/](http://www.python.org/)

[http://apt.ubuntu.com/p/kicad](http://apt.ubuntu.com/p/kicad)
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

interface AboutData {
  image: string;
  name: string;
  role: string;
  description: string[];
}

@Component({
  selector: 'app-about',
  standalone: true, // ako koristiš standalone pristup
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  about: AboutData = {
    image: 'images/ProfileImage.jpg', // putanja do slike
    name: 'Šućo Ferizović',
    role: 'Web Developer',
    description: [
      `I am a passionate web developer with a deep interest in creating modern, responsive, and user-friendly applications. I enjoy working with Angular, TypeScript, and Node.js, and I am constantly exploring new technologies to enhance my skills.`,
      `My journey in web development began several years ago, and since then, I have worked on various projects that challenged me to think creatively and improve my coding practices. I am a strong advocate for clean code, modular architecture, and designing interfaces that are intuitive for users.`,
      `Beyond coding, I enjoy learning about UI/UX design principles, exploring cloud technologies, and understanding the latest trends in the web development ecosystem. My goal is to create applications that not only function well but also provide an enjoyable experience for the end user.`,
      `In my free time, I like to contribute to open-source projects, write technical articles, and collaborate with other developers to exchange knowledge. I believe that continuous learning and curiosity are key to growing as a developer.`,
      `I am motivated by challenges and love seeing a project come to life from idea to deployment. Building scalable and maintainable solutions, experimenting with new frameworks, and optimizing performance are aspects of development that excite me the most.`
    ]
  }
}

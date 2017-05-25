export class Location {
    address: string;
    postalCode: string;
    city: string;
    countryCode: string;
    region: string;
}

export class Profile {
    network: string;
    username: string;
    url: string;
    image: string;
}

export class Basics {
    name: string;
    label: string;
    image: string;
    email: string;
    phone: string;
	phones: string[];
    url: string;
    summary: string;
    location: Location = new Location();
    profiles: Array<Profile> = new Array<Profile>();
}

export class Work {
    company: string;
    position: string;
    website: string;
    startDate: string;
    endDate: string;
    summary: string;
    picture: string;
    highlights: string[];
}

export class Volunteer {
    organization: string;
    position: string;
    website: string;
    startDate: string;
    endDate: string;
    summary: string;
    picture: string;
    highlights: string[];
}

export class Education {
    institution: string;
    area: string;
    studyType: string;
    startDate: string;
    endDate: string;
    gpa: string;
    picture: string;
    courses: string[];
}

export class Award {
    title: string;
    date: string;
    awarder: string;
    summary: string;
}

export class Publication {
    name: string;
    publisher: string;
    releaseDate: string;
    website: string;
    summary: string;
}

export class Skill {
    name: string;
    level: string;
    keywords: string[];
}

export class Language {
    name: string;
    level: string;
}

export class Interest {
    name: string;
    keywords: string[];
}

export class Reference {
    name: string;
    reference: string;
}

export class JsonResume {
    basics: Basics = new Basics();
    work: Array<Work> = new Array<Work>();
    volunteer: Array<Volunteer> = new Array<Volunteer>();
    education: Array<Education> = new Array<Education>();
    awards: Array<Award> = new Array<Award>();
    publications: Array<Publication> = new Array<Publication>();
    skills: Array<Skill> = new Array<Skill>();
    languages: Array<Language> = new Array<Language>();
    interests: Array<Interest> = new Array<Interest>();
    references: Array<Reference> = new Array<Reference>();
}

export class JsonResumeViewTemplate {
    jsonObject: JsonResume = new JsonResume();
    jsonContent: string = "";
    htmlContent: string = "";
}